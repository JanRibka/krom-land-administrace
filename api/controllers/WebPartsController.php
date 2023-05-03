<?php

namespace komLand\api\controllers;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: application/json');

require_once __DIR__.'/./ControllerBase.php';
require_once __DIR__.'/../enums/httpStatucCode.php';
require_once __DIR__.'/../enums/UserRoleEnum.php';
require_once __DIR__.'/../middleware/verifyJWT.php';
require_once __DIR__.'/../middleware/verifyRole.php';
require_once __DIR__.'/../repositories/WebPartsRepository.php';
require_once __DIR__.'/../services/WebPartsService.php';

use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Psr7\ServerRequest;
use kromLand\api\controllers\ControllerBase;
use kromLand\api\enums\HttpStatusCode;
use kromLand\api\enums\UserRoleEnum;
use kromLand\api\models\webParts\conditions\ConditionsModel;
use kromLand\api\repositories\WebPartsRepository;
use kromLand\api\services\IWebPartsService;
use kromLand\api\services\WebPartsService;

use function kromLand\api\middleware\verifyJWT;
use function kromLand\api\middleware\verifyRole;

class WebPartsController extends ControllerBase
{
    private readonly IWebPartsService $_webPartstService;

    public function __construct(IWebPartsService $pWebPartsService)
    {
        $this->_webPartstService = $pWebPartsService;
    }

    /**
     * Get Home data.
     */
    public function getHome()
    {
        try {
            $home = $this->_webPartstService->getHome(1);

            $this->apiResponse(true, '', $home);
        } catch (\Exception $ex) {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get Actions data.
     */
    public function getActions()
    {
        try {
            $actions = $this->_webPartstService->getActions(1);

            $this->apiResponse(true, '', $actions);
        } catch (\Exception $ex) {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get Gallery data.
     */
    public function getGallery()
    {
        try {
            $gallery = $this->_webPartstService->getGallery(1);

            $this->apiResponse(true, '', $gallery);
        } catch (\Exception $ex) {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get Contact data.
     */
    public function getContact()
    {
        try {
            $contact = $this->_webPartstService->getContact(1);

            $this->apiResponse(true, '', $contact);
        } catch (\Exception $ex) {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get Contact data.
     */
    public function getGdpr()
    {
        try {
            $gdpr = $this->_webPartstService->getGdpr(1);

            $this->apiResponse(true, '', $gdpr);
        } catch (\Exception $ex) {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * GDPR update.
     */
    public function gdprUpdate()
    {
        try {
            $jsonData = file_get_contents('php://input');
            $data = json_decode($jsonData);

            $conditions = new ConditionsModel(
                $data->Id,
                $data->Label,
                $data->Text
            );

            $this->_webPartstService->gdprUpdate($conditions);

            $this->apiResponse(true, '');
        } catch (\Exception $ex) {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get Contact data.
     */
    public function getTermsOfConditions()
    {
        try {
            $conditions = $this->_webPartstService->getTermsOfConditions(1);

            $this->apiResponse(true, '', $conditions);
        } catch (\Exception $ex) {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Term of conditions update.
     */
    public function termsOfConditionsUpdate()
    {
        try {
            $jsonData = file_get_contents('php://input');
            $data = json_decode($jsonData);

            $conditions = new ConditionsModel(
                $data->Id,
                $data->Label,
                $data->Text
            );

            $this->_webPartstService->termsOfConditionsUpdate($conditions);

            $this->apiResponse(true, '');
        } catch (\Exception $ex) {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' || $_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_GET['function'])) {
        $functionName = $_GET['function'];

        $userRoles = [UserRoleEnum::ADMIN];

        switch ($functionName) {
            case 'getHome':
            case 'getActions':
            case 'getGallery':
            case 'getContact':
            case 'getGdpr':
            case 'getTermsOfConditions':
                $userRoles = [
                    UserRoleEnum::ADMIN,
                    UserRoleEnum::EDITOR,
                    UserRoleEnum::USER,
                ];

                break;
        }

        $webPartsRepository = new WebPartsRepository();
        $webPartsService = new WebPartsService($webPartsRepository);
        $controller = new WebPartsController($webPartsService);

        if (method_exists($controller, $functionName)) {
            $request = new ServerRequest(
                $_SERVER['REQUEST_METHOD'],
                $_SERVER['REQUEST_URI'],
                $_SERVER
            );
            $response = new Response();
            $response = verifyJWT($request, $response,
                function ($request, $response) use ($controller, $functionName, $userRoles) {
                    return verifyRole($userRoles)($request, $response,
                        function ($request, $response) use ($controller, $functionName) {
                            call_user_func([$controller, $functionName]);

                            return $response;
                        }, false);
                }, false);

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
