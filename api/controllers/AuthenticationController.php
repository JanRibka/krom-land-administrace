<?php

namespace komLand\api\controllers;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: application/json');

require_once __DIR__.'/./ControllerBase.php';
require_once __DIR__.'/../enums/HttpStatucCode.php';
require_once __DIR__.'/../repositories/AuthenticationRepository.php';
require_once __DIR__.'/../models/authentication/UserModel.php';
require_once __DIR__.'/../models/authentication/LoginResponseModel.php';
require_once __DIR__.'/../models/authentication/RefreshTokenResponseModel.php';
require_once __DIR__.'/../services/AuthenticationService.php';
require_once __DIR__.'/../services/FileService.php';
require_once __DIR__.'/../services/CommonService.php';
require_once __DIR__.'/../constants/global.php';
require_once __DIR__.'/../enums/UserRoleEnum.php';
require_once __DIR__.'/../middleware/verifyJWT.php';
require_once __DIR__.'/../middleware/verifyRole.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Psr7\ServerRequest;
use kromLand\api\controllers\ControllerBase;
use kromLand\api\enums\HttpStatusCode;
use kromLand\api\enums\UserRoleEnum;
use kromLand\api\models\authentication\LoginResponseModel;
use kromLand\api\models\authentication\RefreshTokenResponseModel;
use kromLand\api\models\authentication\UserModel;
use kromLand\api\repositories\AuthenticationRepository;
use kromLand\api\services\AuthenticationService;
use kromLand\api\services\CommonService;
use kromLand\api\services\FileService;
use kromLand\api\services\IAuthenticationService;
use kromLand\api\services\ICommonService;

use function kromLand\api\middleware\verifyJWT;
use function kromLand\api\middleware\verifyRole;

class AuthenticationController extends ControllerBase
{
    private readonly IAuthenticationService $_authenticationService;
    private readonly ICommonService $_commonService;

    public function __construct(IAuthenticationService $pAuthenticationService, ICommonService $pCommonService)
    {
        $this->_authenticationService = $pAuthenticationService;
        $this->_commonService = $pCommonService;
    }

    /**
     * Register new user.
     */
    public function register()
    {
        try {
            $userName = $_POST['userName'];
            $password = $_POST['password'];
            $userRole = $_POST['userRole'];
            $idLoggedUser = $_POST['idLoggedUser'];

            if (!(bool) $userName || !(bool) $password) {
                $this->apiResponse(false, 'Uživatelské jméno a heslo jsou povinné', null, HttpStatusCode::BAD_REQUEST);
                exit;
            }

            // Check for duplicate usernames in DB
            $duplicate = $this->_authenticationService->getDuplicateUser($userName);

            if ($duplicate) {
                // Conflict
                $this->apiResponse(false, 'Uživatelské jméno již existuje', null, HttpStatusCode::CONFLICT);
                exit;
            }

            // Encrypt the password
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            // Store the new user
            $loggedUser = $this->_authenticationService->getUserByUserId($idLoggedUser);
            $idParent = (bool) $loggedUser->IdParent ? $loggedUser->IdParent : $loggedUser->Id;

            $user = new UserModel();
            $user->UserName = $userName;
            $user->Password = $hashedPassword;
            $user->UserRoleValue = $userRole;
            $user->IdParent = $idParent;
            $user->LoginCount = 0;
            $user->LoginAttemptCount = 0;

            $userId = $this->_authenticationService->insertUser($user);

            $this->apiResponse(true, 'Uživatel '.$user->UserName.' byl vytvořen', $userId, HttpStatusCode::CREATED);
        } catch (\Exception $ex) {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Login user.
     */
    public function login()
    {
        try {
            $userName = $_POST['userName'];
            $password = $_POST['password'];

            if (!(bool) $userName || !(bool) $password) {
                $this->apiResponse(false, 'Uživatelské jméno a heslo jsou povinné', null, HttpStatusCode::BAD_REQUEST);
                exit;
            }

            $dbUser = $this->_authenticationService->getUserByUserName($userName);

            if (!(bool) $dbUser->Id) {
                // Unauthorized
                $this->apiResponse(false, 'Nesprávné uživatelské jméno, nebo heslo', null, HttpStatusCode::UNAUTHORIZED);
                exit;
            }

            // Evalueate password
            $match = password_verify($password, $dbUser->Password);

            if ($match) {
                // Create JWTs (JSON Web Tokens)
                $payload = [
                    'userinfo' => [
                        'username' => $dbUser->UserName,
                        'userrole' => $dbUser->UserRoleValue,
                        'iduser' => $dbUser->Id,
                    ],
                    'exp' => time() + 30,
                ];

                global $accessTokenSecret;
                $accessToken = JWT::encode($payload, $accessTokenSecret[APP_ENV], 'HS256');

                $payload = [
                    'username' => $dbUser->UserName,
                    'exp' => time() + 24 * 60 * 60,
                ];
                global $refreshTokenSecret;
                $refreshToken = JWT::encode($payload, $refreshTokenSecret[APP_ENV], 'HS256');

                // Saving refreshToken with current user
                $user = new UserModel();
                $user->Id = $dbUser->Id;
                $user->UserName = $dbUser->UserName;
                $user->RefreshToken = $refreshToken;

                $this->_authenticationService->updatetUser($user);

                setcookie('jwt', $refreshToken, [
                    'expires' => time() + 24 * 60 * 60,
                    'path' => '/admin',
                    'httpOnly' => true,
                    'secure' => true,
                    'sameSite' => 'None',
                ]);

                $user = new UserModel();
                $user->Id = $dbUser->Id;
                $user->LastLogin = new \DateTime();
                $user->LoginCount = $dbUser->LoginCount + 1;

                $this->_authenticationService->updatetUser($user);

                $responseData = new LoginResponseModel(
                    $dbUser->UserRoleValue,
                    $accessToken,
                    $dbUser->Id
                );

                // Clean up
                $this->_commonService->cleanUp();

                $this->apiResponse(true, '', $responseData);
            } else {
                $user = new UserModel();
                $user->Id = $dbUser->Id;
                $user->LastLoginAttempt = new \DateTime();
                $user->LoginAttemptCount = $dbUser->LoginAttemptCount + 1;
                $this->_authenticationService->updatetUser($user);

                $this->apiResponse(false, 'Nesprávné uživatelské jméno, nebo heslo', null, HttpStatusCode::UNAUTHORIZED);
            }
        } catch (\Exception $ex) {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Handle refresh token.
     */
    public function refreshToken()
    {
        try {
            $jwtCookie = $_COOKIE['jwt'];

            if (!isset($jwtCookie)) {
                $this->apiResponse(false, '', null, HttpStatusCode::UNAUTHORIZED);
                exit;
            }

            $refreshToken = $jwtCookie;

            $dbUser = $this->_authenticationService->getUserByRefreshToken($refreshToken);

            if (!(bool) $dbUser->Id) {
                // Forbidden
                $this->apiResponse(false, 'Neplatný token', null, HttpStatusCode::FORBIDDEN);
                exit;
            }

            try {
                global $refreshTokenSecret;
                global $accessTokenSecret;

                $key = new Key($refreshTokenSecret[APP_ENV], 'HS256');
                $decoded = JWT::decode($refreshToken, $key);

                if ($dbUser->UserName !== $decoded->username) {
                    throw new \Exception();
                }

                $payload = [
                    'userinfo' => [
                        'username' => $dbUser->UserName,
                        'userrole' => $dbUser->UserRoleValue,
                        'iduser' => $dbUser->Id,
                    ],
                    'exp' => time() + 30,
                ];

                $accessToken = JWT::encode($payload, $accessTokenSecret[APP_ENV], 'HS256');
                $responseData = new RefreshTokenResponseModel(
                    $dbUser->UserRoleValue,
                    $accessToken,
                    $dbUser->UserName,
                    $dbUser->Id
                );

                $this->apiResponse(true, '', $responseData);
            } catch (\Exception $ex) {
                $this->apiResponse(false, 'Neplatný token', null, HttpStatusCode::FORBIDDEN);
            }
        } catch (\Exception $ex) {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Logout.
     */
    public function logout()
    {
        // On client logout, also delete the access token
        try {
            $jwtCookie = $_COOKIE['jwt'];

            if (!isset($jwtCookie)) {
                // No content
                $this->apiResponse(false, '', null, HttpStatusCode::NO_CONTENT);
                exit;
            }

            $refreshToken = $jwtCookie;

            // Is refresh token in db?
            $dbUser = $this->_authenticationService->getUserByRefreshToken($refreshToken);

            if (!(bool) $dbUser->Id) {
                setcookie('jwt', '', [
                    'expires' => time(),
                    'path' => '/admin',
                    'httpOnly' => true,
                    'secure' => true,
                    'sameSite' => 'None',
                ]);

                // Forbidden
                $this->apiResponse(false, 'Nesprávný token', null, HttpStatusCode::FORBIDDEN);
                exit;
            }

            // Delete refresh token in db
            $newUser = new UserModel();
            $newUser->Id = $dbUser->Id;
            $newUser->RefreshToken = '';

            $this->_authenticationService->updatetUser($newUser);
            // Secure: true - only servers on https
            setcookie('jwt', '', [
                'expires' => time(),
                'path' => '/admin',
                'httpOnly' => true,
                'secure' => true,
                'sameSite' => 'None',
            ]);
            $this->apiResponse(true, '', null, HttpStatusCode::NO_CONTENT);
        } catch (\Exception $ex) {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Password change.
     */
    public function passwordChange()
    {
        try {
            $password = $_POST['password'];
            $idLoggedUser = $_GET['idLoggedUser'];

            if (!(bool) $password) {
                $this->apiResponse(false, 'Heslo jsou povinné', null, HttpStatusCode::BAD_REQUEST);
                exit;
            }

            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $user = new UserModel();

            $user->Id = $idLoggedUser;
            $user->Password = $hashedPassword;

            $this->_authenticationService->updatetUser($user);

            $this->apiResponse(true, '');
        } catch (\Exception $ex) {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['function'])) {
        $functionName = $_GET['function'];

        $disableVerification = false;
        $userRoles = [UserRoleEnum::ADMIN];

        switch ($functionName) {
            case 'login':
            case 'refreshToken':
                $disableVerification = true;
                // no break
            case 'logout':
            case 'passwordChange':
                $userRoles = [
                    UserRoleEnum::ADMIN,
                    UserRoleEnum::EDITOR,
                    UserRoleEnum::USER,
                ];

                break;
        }

        $disableAuth = false;

        // if(isset($_GET['disableAuth'])) $disableAuth = true;

        $authenticationRepository = new AuthenticationRepository();
        $authenticationService = new AuthenticationService($authenticationRepository);
        $fileService = new FileService();
        $commonService = new CommonService($fileService);
        $controller = new AuthenticationController($authenticationService, $commonService);

        if (method_exists($controller, $functionName)) {
            $request = new ServerRequest(
                $_SERVER['REQUEST_METHOD'],
                $_SERVER['REQUEST_URI'],
                $_SERVER
            );
            $response = new Response();
            $response = verifyJWT($request, $response,
                function ($request, $response) use ($controller, $functionName, $userRoles, $disableVerification, $disableAuth) {
                    return verifyRole($userRoles)($request, $response,
                        function ($request, $response) use ($controller, $functionName) {
                            call_user_func([$controller, $functionName]);

                            return $response;
                        }, $disableVerification || $disableAuth);
                }, $disableVerification || $disableAuth);

            $statusCode = $response->getStatusCode();

            if ($statusCode !== HttpStatusCode::OK) {
                http_response_code($response->getStatusCode());
                echo json_encode([
                    'Success' => false,
                    'ErrMsg' => 'Pro provedení akce nemáte dostatečná oprávnění',
                ], JSON_UNESCAPED_UNICODE);
            }
        } else {
            http_response_code(HttpStatusCode::INTERNAL_SERVER_ERROR);
            echo json_encode([
                'Success' => false,
                'ErrMsg' => 'Chybná funkce, nebo nebyla zadána',
            ], JSON_UNESCAPED_UNICODE);
        }
    }
}
