<?php

use GuzzleHttp\Psr7\Response;

require_once __DIR__ . '/./ControllerBase.php';
require_once __DIR__ . '/../middleware/verifyJWT.php';
require_once __DIR__ . '/../middleware/verifyRole.php';
require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../enums/UserRoleEnum.php';
require_once __DIR__ . '/../enums/ImageLocationEnum.php';
require_once __DIR__ . '/../repositories/ImageRepository.php';
require_once __DIR__ . '/../services/ImageService.php';
require_once __DIR__ . '/../services/FileService.php';
require_once __DIR__ . '/../models/image/ImageModel.php';
require_once __DIR__ . '/../helpers/enumHelper.php';

use GuzzleHttp\Psr7\ServerRequest;
use kromLand\api\enums\UserRoleEnum;
use kromLand\api\enums\HttpStatusCode;
use kromLand\api\services\FileService;
use kromLand\api\services\IFileService;
use kromLand\api\services\ImageService;
use kromLand\api\services\IImageService;
use kromLand\api\models\image\ImageModel;
use kromLand\api\controllers\ControllerBase;
use kromLand\api\repositories\ImageRepository;

use function kromLand\api\middleware\verifyJWT;
use function kromLand\api\middleware\verifyRole;

class ImageController extends ControllerBase
{
    private readonly IImageService $_imageService;
    private readonly IFileService $_fileService;

    public function __construct(IImageService $imageService, IFileService $fileService)
    {
        $this->_imageService = $imageService;
        $this->_fileService = $fileService;
    }

    /**
     * Upload image on server.
     */
    public function imageUpload()
    {
        try {
            $newImageName = $_POST['fileName'];
            $sourceDir = $_FILES['file']['tmp_name'];
            $targetDir = __DIR__ . '/../../upload/' . $newImageName;

            $this->_fileService->uploadedFileSave($sourceDir, $targetDir);

            $this->apiResponse(true, '');
        } catch (Exception $ex) {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete image.
     */
    public function imageDelete()
    {
        try {
            $jsonData = file_get_contents('php://input');
            $data = json_decode($jsonData);
            $imageLocation = $data->location;
            $imageLocation = getValueFromImageLocationEnumByNumber($imageLocation);
            $id = $data->id;
            $itemName = $data->itemName;
            $imageName = $data->imageName;
            $directory = $data->directory;
            $filePath = __DIR__ . $directory . $imageName;

            $this->_fileService->fileDelete($filePath);
            $this->_imageService->imageDelete($id, $imageLocation, $itemName);

            $this->apiResponse(true, '');
        } catch (Exception $ex) {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Insert image.
     */
    public function imageSave()
    {
        try {
            $jsonData = file_get_contents('php://input');
            $data = json_decode($jsonData);
            $id = $data?->id ?? null;
            $image = $data->image;
            $imageName = $data->image->name;
            $imageLocation = $data->location;
            $imageLocation = getValueFromImageLocationEnumByNumber($imageLocation);
            $itemName = $data->itemName;
            $sourceImage = __DIR__ . '/../../upload/' . $imageName;
            $targetImage = __DIR__ . '/../../../publicImg/' . $imageName;

            $image = new ImageModel(
                $image->path,
                $image->alt,
                $image->name
            );

            $savedDocumentId = $this->_imageService->imageSave($image, $id, $imageLocation, $itemName);
            $this->_fileService->fileCopy($sourceImage, $targetImage);
            $this->_fileService->fileDelete($sourceImage);

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

        $imageRepository = new ImageRepository();
        $imageService = new ImageService($imageRepository);
        $fileService = new FileService();
        $controller = new ImageController($imageService, $fileService);

        if (method_exists($controller, $functionName)) {
            $request = new ServerRequest(
                $_SERVER['REQUEST_METHOD'],
                $_SERVER['REQUEST_URI'],
                $_SERVER
            );
            $response = new Response();
            $response = verifyJWT(
                $request,
                $response,
                function ($request, $response) use ($controller, $functionName, $userRoles) {
                    return verifyRole($userRoles)(
                        $request,
                        $response,
                        function ($request, $response) use ($controller, $functionName) {
                            call_user_func([$controller, $functionName]);

                            return $response;
                        },
                        false
                    );
                },
                false
            );

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
