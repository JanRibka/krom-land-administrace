<?php
namespace komLand\api\controllers;

require_once __DIR__ . "/../enums/httpStatucCode.php";
require_once __DIR__ . "/./ControllerBase.php";
require_once __DIR__ . "/../repositories/AuthenticationRepository.php";
require_once __DIR__ . "/../models/authentication/UserModel.php";
require_once __DIR__ . "/../services/AuthenticationService.php";
require_once __DIR__ . "/../constants/global.php";
require_once __DIR__ . "/../enums/UserRoleEnum.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

use DateTime;
use Exception;
use kromLand\api\controllers\ControllerBase;
use kromLand\api\enums\HttpStatusCode;
use kromLand\api\models\authentication\UserModel;
use kromLand\api\services\IAuthenticationService;
use kromLand\api\services\AuthenticationService;
use kromLand\api\repositories\AuthenticationRepository;
use kromLand\api\enums\UserRoleEnum;

class AuthenticationController extends ControllerBase
{
    private readonly IAuthenticationService $_authenticationService;

    public function __construct(IAuthenticationService $pAuthenticationService)
    {
        $this->_authenticationService = $pAuthenticationService;
    }
    
    /**
     * Register new user
     */
    public function register()
    {        
        try
        {            
            $data = json_decode(file_get_contents('php://input'), true);
            $userName = $data['userName'];
            $password = $data['password'];
            $userRole = $data['userRole'];
            $idParent = $data['idParent'];

            if (!!!$userName || !!!$password) {
                $this->apiResponse(false, "Uživatelské jméno a heslo jsou povinné", null, HttpStatusCode::BAD_REQUEST);
                die;
            }
            
            // Check for duplicate usernames in DB
            $duplicate = $this->_authenticationService->getDuplicateUser($userName);
            
            if ($duplicate)
            {
                // Conflict
                $this->apiResponse(false, "Uživatelské jméno již existuje", null, HttpStatusCode::CONFLICT);
                die;
            }
            
            // Encrypt the password
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            
            // Store the new user
            $user = new UserModel();
            $user->UserName = $userName;
            $user->Password = $hashedPassword;
            $user->UserRoleValue = $userRole;
            $user->IdParent = $idParent;     

            $userId = $this->_authenticationService->insertUser($user);
            
            $this->apiResponse(true, "Uživatel " . $user->UserName . " byl vytvořen", $userId, HttpStatusCode::CREATED);            
        }
        catch(Exception $ex) 
        {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);            
        }
    }
    
    /**
     * Login user
     */
    public function login() 
    {
        try
        {
            $data = json_decode(file_get_contents('php://input'), true);
            $userName = $data['userName'];
            $password = $data['password'];
            
            if (!!!$userName || !!!$password) {
                $this->apiResponse(false, "Uživatelské jméno a heslo jsou povinné", null, HttpStatusCode::BAD_REQUEST);                
                die;
            }
            
            $dbUser = $this->_authenticationService->getUserByUserName($userName);
            
            if(!!!$dbUser->Id) 
            {
                // Unauthorized
                $this->apiResponse(false, "Nesprávné uživatelské jméno, nebo heslo", null, HttpStatusCode::UNAUTHORIZED);                
                die;
            }
            
            // Evalueate password
            $match = password_verify($password, $dbUser->Password);
            
            if ($match) {
                // Create JWTs (JSON Web Tokens)
                $payload = [
                    "userinfo" => [
                        "username" => $dbUser->UserName,
                        "userrole" => $dbUser->UserRoleValue,
                    ],                    
                    "exp" => time() + 30
                ];  

                global $accessTokenSecret;
                $accessToken = JWT::encode($payload, $accessTokenSecret[APP_ENV], "HS256");

                $payload = [
                    "username" => $dbUser->UserName,
                    "exp" => time() + 24 * 60 * 60
                ];
                global $refreshTokenSecret;
                $refreshToken = JWT::encode($payload, $refreshTokenSecret[APP_ENV], "HS256");

                // Saving refreshToken with current user
                $user = new UserModel();
                $user->Id = $dbUser->Id;
                $user->UserName = $dbUser->UserName;
                $user->RefreshToken = $refreshToken;

                $this->_authenticationService->updatetUser($user);

                setcookie('jwt', $refreshToken, [
                    'expires' => time() + 24 * 60 * 60,
                    'path' => '/',
                    'httpOnly' => true,
                    "secure" => true,
                    "sameSite" => "None"
                ]);

                $user = new UserModel();
                $user->Id = $dbUser->Id;
                $user->LastLogin = new DateTime();
                $user->LoginCount = $dbUser->LoginCount + 1;
                $this->_authenticationService->updatetUser($user);
                
                $this->apiResponse(true, "", $accessToken);                
            } else {
                $user = new UserModel();
                $user->Id = $dbUser->Id;
                $user->LastLoginAttempt = new DateTime();
                $this->_authenticationService->updatetUser($user);

                $this->apiResponse(false, "Nesprávné uživatelské jméno, nebo heslo", null, HttpStatusCode::UNAUTHORIZED);                               
            }
        }
        catch(Exception $ex) 
        {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Handle refresh token
     */
    public function refreshToken()
    {
        try
        {            
            $jwtCookie = $_COOKIE['jwt'];

            if (!isset($jwtCookie)) {
                $this->apiResponse(false, "", null, HttpStatusCode::UNAUTHORIZED);
                die;
            }

            $refreshToken = $jwtCookie;
            
            $dbUser = $this->_authenticationService->getUserByRefreshToken($refreshToken);
            
            if(!!!$dbUser->Id) 
            {
                // Forbidden
                $this->apiResponse(false, "Nesprávný token", null, HttpStatusCode::FORBIDDEN);                
                die;
            }

            try {
                global $refreshTokenSecret;
                global $accessTokenSecret;          
      
                $key = new Key($refreshTokenSecret[APP_ENV], 'HS256');
                $decoded = JWT::decode($refreshToken, $key);
                
                if ($dbUser->UserName !== $decoded->username) throw new Exception();

                $payload = [
                    "userinfo" => [
                        "username" => $dbUser->UserName,
                        "userrole" => $dbUser->UserRoleValue,
                    ],  
                    "exp" => time() + 30
                ];  
                
                $accessToken = JWT::encode($payload, $accessTokenSecret[APP_ENV], "HS256");

                $this->apiResponse(true, "", $accessToken);

            } catch (Exception $ex) {
                $this->apiResponse(false, "Nesprávný token", null, HttpStatusCode::FORBIDDEN);
            }        
        }
        catch(Exception $ex) 
        {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }   
    }

    public function logout()
    {
        // On client, also delete the access token
        try
        {
            $jwtCookie = $_COOKIE['jwt'];

            if (!isset($jwtCookie)) {
                // No content
                $this->apiResponse(false, "", null, HttpStatusCode::NO_CONTENT);
                die;
            }

            $refreshToken = $jwtCookie;
            
            // Is refresh token in db?            
            $dbUser = $this->_authenticationService->getUserByRefreshToken($refreshToken);

            if(!!!$dbUser->Id) 
            {
                setcookie('jwt', "", [
                    'expires' => time(),
                    'path' => '/',
                    'httpOnly' => true,
                    "secure" => true,
                    "sameSite" => "None"
                ]);

                // Forbidden
                $this->apiResponse(false, "Nesprávný token", null, HttpStatusCode::NO_CONTENT);                
                die;
            }

            // Delete refresh token in db            
            $newUser = new UserModel();
            $newUser->Id = $dbUser->Id;
            $newUser->RefreshToken = "";
            
            $this->_authenticationService->updatetUser($newUser);
            // Secure: true - only servers on https
            setcookie('jwt', "", [
                'expires' => time(),
                'path' => '/',
                'httpOnly' => true,
                "secure" => true,
                "sameSite" => "None"
            ]);
            $this->apiResponse(true, "", null, HttpStatusCode::NO_CONTENT);

        } catch (Exception $ex)
        {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'GET') { 
    if (isset($_GET['function'])) {
        $userRoles = [
            "register" => [
                UserRoleEnum::ADMIN
            ]
        ];

        $functionName = $_GET['function']; 
        $authenticationRepository = new AuthenticationRepository();
        $authenticationService = new AuthenticationService($authenticationRepository);
        $controller = new AuthenticationController($authenticationService);         
        
        if (method_exists($controller, $functionName)) {
            call_user_func([$controller, $functionName]); 
        } else {
            http_response_code(HttpStatusCode::INTERNAL_SERVER_ERROR);
            echo json_encode([
                "Success" => false,
                "ErrMsg" => "Chybná funkce, nebo nebyla zadána"                
            ], JSON_UNESCAPED_UNICODE);            
        } 
    } 
}
?>