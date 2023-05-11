<?php

use GuzzleHttp\Psr7\Response;

require_once __DIR__.'/./ControllerBase.php';
require_once __DIR__.'/../middleware/verifyJWT.php';
require_once __DIR__.'/../middleware/verifyRole.php';
require_once __DIR__.'/../../vendor/autoload.php';
require_once __DIR__.'/../enums/UserRoleEnum.php';
require_once __DIR__.'/../repositories/DashboardRepository.php';
require_once __DIR__.'/../services/DashboardService.php';

use GuzzleHttp\Psr7\ServerRequest;
use kromLand\api\controllers\ControllerBase;
use kromLand\api\enums\HttpStatusCode;
use kromLand\api\enums\UserRoleEnum;
use kromLand\api\repositories\DashboardRepository;
use kromLand\api\repositories\IDashboardService;
use kromLand\api\services\DashboardService;

use function kromLand\api\middleware\verifyJWT;
use function kromLand\api\middleware\verifyRole;

class DashboardController extends ControllerBase
{
    private readonly IDashboardService $_dashboardService;

    public function __construct(IDashboardService $pDashboardService)
    {
        $this->_dashboardService = $pDashboardService;
    }

    /**
     * Get dashboard.
     */
    public function getDashboard()
    {
        try {
            $dashboard = $this->_dashboardService->getDashboard();

            $this->apiResponse(true, '', $dashboard);
        } catch (Exception $ex) {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get registrations.
     */
    public function getRegistrations()
    {
        try {
            $registrations = $this->_dashboardService->getRegistrations();

            $this->apiResponse(true, '', $registrations);
        } catch (Exception $ex) {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }

    // /**
    //  * Delete document.
    //  */
    // public function documentDelete()
    // {
    //     try {
    //         $jsonData = file_get_contents('php://input');
    //         $data = json_decode($jsonData);
    //         $id = $data->id;
    //         $documentName = $data->documentName;
    //         $directory = $data->directory;
    //         $filePath = __DIR__.$directory.$documentName;

    //         $this->_documentService->documentDelete($id);
    //         $this->_fileService->fileDelete($filePath);

    //         $this->apiResponse(true, '');
    //     } catch (Exception $ex) {
    //         $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
    //     }
    // }

    // /**
    //  * Insert document.
    //  */
    // public function documentSave()
    // {
    //     try {
    //         $jsonData = file_get_contents('php://input');
    //         $data = json_decode($jsonData);
    //         $id = $data->id;
    //         $document = $data->document;
    //         $documentName = $data->document->Name;
    //         $sourceDocument = __DIR__.'/../../upload/'.$documentName;
    //         $targetDocument = __DIR__.'/../../../publicDocuments/'.$documentName;

    //         $document = new DocumentModel(
    //             $document->Path,
    //             $document->Name
    //         );

    //         $savedDocumentId = $this->_documentService->documentSave($document, $id);
    //         $this->_fileService->fileCopy($sourceDocument, $targetDocument);
    //         $this->_fileService->fileDelete($sourceDocument);

    //         $this->apiResponse(true, '', $savedDocumentId);
    //     } catch (Exception $ex) {
    //         $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
    //     }
    // }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['function'])) {
        $functionName = $_GET['function'];
        $userRoles = [UserRoleEnum::ADMIN];

        $dashboardRepository = new DashboardRepository();
        $dashboardService = new DashboardService($dashboardRepository);
        $controller = new DashboardController($dashboardService);

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
