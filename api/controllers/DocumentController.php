<?php

use GuzzleHttp\Psr7\Response;

require_once __DIR__.'/./ControllerBase.php';
require_once __DIR__.'/../middleware/verifyJWT.php';
require_once __DIR__.'/../middleware/verifyRole.php';
require_once __DIR__.'/../../vendor/autoload.php';
require_once __DIR__.'/../enums/UserRoleEnum.php';
require_once __DIR__.'/../repositories/DocumentRepository.php';
require_once __DIR__.'/../services/DocumentService.php';
require_once __DIR__.'/../services/FileService.php';
require_once __DIR__.'/../models/document/DocumentModel.php';

use GuzzleHttp\Psr7\ServerRequest;
use kromLand\api\controllers\ControllerBase;
use kromLand\api\enums\HttpStatusCode;
use kromLand\api\enums\UserRoleEnum;
use kromLand\api\models\document\DocumentModel;
use kromLand\api\repositories\DocumentRepository;
use kromLand\api\services\DocumentService;
use kromLand\api\services\FileService;
use kromLand\api\services\IDocumentService;
use kromLand\api\services\IFileService;

use function kromLand\api\middleware\verifyJWT;
use function kromLand\api\middleware\verifyRole;

class DocumentController extends ControllerBase
{
    private readonly IDocumentService $_documentService;
    private readonly IFileService $_fileService;

    public function __construct(IDocumentService $documentService, IFileService $fileService)
    {
        $this->_documentService = $documentService;
        $this->_fileService = $fileService;
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

            $this->_fileService->uploadedFileSave($sourceDir, $targetDir);

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

            $this->_documentService->documentDelete($id);
            $this->_fileService->fileDelete($filePath);

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

            $document = new DocumentModel(
                $document->Path,
                $document->Name
            );

            $savedDocumentId = $this->_documentService->documentSave($document, $id);
            $this->_fileService->fileCopy($sourceDocument, $targetDocument);
            $this->_fileService->fileDelete($sourceDocument);

            $this->apiResponse(true, '', $savedDocumentId);
        } catch (Exception $ex) {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_GET['function'])) {
        $functionName = $_GET['function'];
        $userRoles = [UserRoleEnum::ADMIN, UserRoleEnum::EDITOR];

        $documentRepository = new DocumentRepository();
        $documentService = new DocumentService($documentRepository);
        $fileService = new FileService();
        $controller = new DocumentController($documentService, $fileService);

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
