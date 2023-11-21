<?php

namespace komLand\api\controllers;

use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Psr7\ServerRequest;
use kromLand\api\enums\UserRoleEnum;
use kromLand\api\enums\HttpStatusCode;
use kromLand\api\controllers\ControllerBase;
use kromLand\api\services\AdmSettingsService;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: application/json');

require_once __DIR__ . '/./ControllerBase.php';
require_once __DIR__ . '/../enums/HttpStatucCode.php';
require_once __DIR__ . '/../constants/global.php';
require_once __DIR__ . '/../enums/UserRoleEnum.php';
require_once __DIR__ . '/../middleware/verifyJWT.php';
require_once __DIR__ . '/../middleware/verifyRole.php';
require_once __DIR__ . '/../repositories/AdmSettingsRepository.php';
require_once __DIR__ . '/../services/AdmSettingsService.php';
require_once __DIR__ . '/../repositories/CommonRepository.php';
require_once __DIR__ . '/../repositories/AuthenticationRepository.php';
require_once __DIR__ . '/../repositories/AdmSettingsRepository.php';
require_once __DIR__ . '/../services/AuthenticationService.php';
require_once __DIR__ . '/../repositories/AuthenticationRepository.php';

use kromLand\api\services\IAdmSettingsService;
use function kromLand\api\middleware\verifyJWT;
use kromLand\api\repositories\CommonRepository;
use function kromLand\api\middleware\verifyRole;
use kromLand\api\services\AuthenticationService;
use kromLand\api\services\IAuthenticationService;
use kromLand\api\repositories\AdmSettingsRepository;
use kromLand\api\repositories\AuthenticationRepository;

class AdmSettingsController extends ControllerBase
{
    private readonly IAdmSettingsService $_admSettingsService;
    private readonly IAuthenticationService $_authenticationService;

    public function __construct(IAdmSettingsService $pAdmSettingsService, IAuthenticationService $pAuthenticationService)
    {
        $this->_admSettingsService = $pAdmSettingsService;
        $this->_authenticationService = $pAuthenticationService;
    }

    /**
     * Get administration settings.
     */
    public function getDropDownsData()
    {
        try {
            $dropDownsData = $this->_admSettingsService->getDropDownsData();

            $this->apiResponse(true, '', $dropDownsData);
        } catch (\Exception $ex) {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get user role list
     */
    public function getRoleList()
    {
        try {
            $admSettings = $this->_admSettingsService->getRoleList();

            $this->apiResponse(true, '', $admSettings);
        } catch (\Exception $ex) {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get user.
     */
    public function getUsers()
    {
        try {
            $idLoggedUser = $_GET['idLoggedUser'];

            $users = $this->_admSettingsService->getUsersByLoggedUseId($idLoggedUser);

            $this->apiResponse(true, '', $users);
        } catch (\Exception $ex) {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get user for edit.
     */
    public function getUserForEdit()
    {
        try {
            $idUser = $_GET['id'];

            $users = $this->_admSettingsService->getUsersForEdit($idUser);

            $this->apiResponse(true, '', $users);
        } catch (\Exception $ex) {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update user.
     */
    public function userUpdate()
    {
        $user = $_POST['user'];
        $idLoggedUser = $_GET['idLoggedUser'];

        try {
            $userDecoded = json_decode($user);

            // Check for duplicate usernames in DB
            $dbUser = $this->_authenticationService->getUserByUserName($userDecoded->UserName);

            if ($dbUser->UserName === $userDecoded->UserName && $dbUser->Id !== $userDecoded->Id) {
                // Conflict
                $this->apiResponse(false, 'Uživatelské jméno již existuje', null, HttpStatusCode::CONFLICT);
                exit;
            }

            $this->_admSettingsService->userUpdate($user, $idLoggedUser);

            $this->apiResponse(true, '');
        } catch (\Exception $ex) {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete user.
     */
    public function userDelete()
    {
        $id = $_GET['id'];
        $idLoggedUser = $_GET['idLoggedUser'];

        try {
            $this->_admSettingsService->userDelete($id, $idLoggedUser);

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
            case 'getDropDownsData':
            case 'getAdmSettings':
            case 'getRoleList':
            case 'getUsers':
            case 'getUserForEdit':
            case 'userUpdate':
                $userRoles = [
                    UserRoleEnum::ADMIN,
                    UserRoleEnum::EDITOR,
                    UserRoleEnum::USER,
                ];

                break;
        }

        $admSettingsRepository = new AdmSettingsRepository();
        $commonRepository = new CommonRepository();
        $authenticationRepository = new AuthenticationRepository();
        $admSettingsService = new AdmSettingsService($admSettingsRepository, $commonRepository, $authenticationRepository);
        $authenticationRepository = new AuthenticationRepository();
        $authenticationService = new AuthenticationService($authenticationRepository);
        $controller = new AdmSettingsController($admSettingsService, $authenticationService);

        if (method_exists($controller, $functionName)) {
            $request = new ServerRequest(
                $_SERVER['REQUEST_METHOD'],
                $_SERVER['REQUEST_URI'],
                $_SERVER
            );
            $response = new Response();
            $response = verifyJWT($request, $response,
                function ($request, $response) use ($controller, $functionName, $userRoles, $disableVerification) {
                    return verifyRole($userRoles)($request, $response,
                        function ($request, $response) use ($controller, $functionName) {
                            call_user_func([$controller, $functionName]);

                            return $response;
                        }, $disableVerification);
                }, $disableVerification);

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
