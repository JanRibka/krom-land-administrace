<?php

namespace komLand\api\controllers;

use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Psr7\ServerRequest;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: application/json');

require_once __DIR__.'/./ControllerBase.php';
require_once __DIR__.'/../enums/httpStatucCode.php';
require_once __DIR__.'/../constants/global.php';
require_once __DIR__.'/../enums/UserRoleEnum.php';
require_once __DIR__.'/../middleware/verifyJWT.php';
require_once __DIR__.'/../middleware/verifyRole.php';

use kromLand\api\controllers\ControllerBase;
use kromLand\api\enums\HttpStatusCode;
use kromLand\api\enums\UserRoleEnum;
use kromLand\api\repositories\AdmSettingsRepository;
use kromLand\api\services\AdmSettingsService;
use kromLand\api\services\IAdmSettingsService;

use function kromLand\api\middleware\verifyJWT;
use function kromLand\api\middleware\verifyRole;

class AdmSettingsController extends ControllerBase
{
    private readonly IAdmSettingsService $_admSettingsService;

    public function __construct(IAdmSettingsService $pAdmSettingsService)
    {
        $this->_admSettingsService = $pAdmSettingsService;
    }

    public function getUsers()
    {
        try {
            $idLoggedUser = $_POST['idLoggedUser'];

            $users = $this->_admSettingsService->getUsersByLoggedUseId($idLoggedUser);

            $this->apiResponse(true, '', $users);
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
                $userRoles = [
                    UserRoleEnum::ADMIN,
                    UserRoleEnum::EDITOR,
                    UserRoleEnum::USER,
                ];

                break;
        }

        $admSettingsRepository = new AdmSettingsRepository();
        $admSettingsService = new AdmSettingsService($admSettingsRepository);
        $controller = new AdmSettingsController($admSettingsService);

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
