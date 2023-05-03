<?php

use GuzzleHttp\Psr7\Response;

require_once __DIR__.'/./ControllerBase.php';
require_once __DIR__.'/../middleware/verifyJWT.php';
require_once __DIR__.'/../middleware/verifyRole.php';
require_once __DIR__.'/../../vendor/autoload.php';
require_once __DIR__.'/../enums/UserRoleEnum.php';
require_once __DIR__.'/../repositories/DocumentRepository.php';
require_once __DIR__.'/../services/DocumentService.php';

use GuzzleHttp\Psr7\ServerRequest;
use kromLand\api\controllers\ControllerBase;
use kromLand\api\enums\HttpStatusCode;
use kromLand\api\enums\UserRoleEnum;
use kromLand\api\repositories\DocumentRepository;
use kromLand\api\services\DocumentService;
use kromLand\api\services\IDocumentService;

use function kromLand\api\middleware\verifyJWT;
use function kromLand\api\middleware\verifyRole;

class DocumentController extends ControllerBase
{
    private readonly IDocumentService $_documentService;

    public function __construct(IDocumentService $pDocumentService)
    {
        $this->_documentService = $pDocumentService;
    }

    /**
     * Upload document on server.
     */
    public function documentUpload()
    {
        try {
            $newDocumentName = $_POST['fileName'];
            $sourceDir = $_FILES['file']['tmp_name'];
            $targetDir = __DIR__.'/../../upload/'.$newDocumentName;

            $this->_documentService->uploadedFileSaveOnServer($sourceDir, $targetDir);

            $this->apiResponse(true, '');
        } catch (Exception $ex) {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete document.
     */
    public function documentDelete()
    {
        try {
            $jsonData = file_get_contents('php://input');
            $data = json_decode($jsonData);
            $id = $data->id;
            $documentName = $data->documentName;
            $directory = $data->directory;
            $filePath = __DIR__.$directory.$documentName;

            $this->_documentService->documentDeleteFromDb($id);
            $this->_documentService->fileDeleteFromServer($filePath);

            $this->apiResponse(true, '');
        } catch (Exception $ex) {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Insert document.
     */
    public function documentSave()
    {
        try {
            $jsonData = file_get_contents('php://input');
            $data = json_decode($jsonData);
            $id = $data->id;
            $document = $data->document;
            $documentName = $data->document->Name;
            $sourceDocument = __DIR__.'/../../upload/'.$documentName;
            $targetDocument = __DIR__.'/../../../publicDocuments/'.$documentName;
            echo json_encode($document);
            $savedDocumentId = $this->_documentService->documentSaveIntoDb($document, $id);
            $this->_documentService->fileCopy($sourceDocument, $targetDocument);
            $this->_documentService->fileDeleteFromServer($sourceDocument);

            $this->apiResponse(true, '', $savedDocumentId);
        } catch (Exception $ex) {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_GET['function'])) {
        $functionName = $_GET['function'];
        $userRoles = [UserRoleEnum::ADMIN];

        $documentRepository = new DocumentRepository();
        $documentService = new DocumentService($documentRepository);
        $controller = new DocumentController($documentService);

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
