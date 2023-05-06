<?php

namespace kromLand\api\services;

use kromLand\api\enums\ImageLocationEnum;
use kromLand\api\models\image\ImageModel;
use kromLand\api\repositories\IImageRepository;

require_once __DIR__.'/./IImageService.php';

class ImageService implements IImageService
{
    private readonly IImageRepository $_imageRepository;

    public function __construct(IImageRepository $imageRepository)
    {
        $this->_imageRepository = $imageRepository;
    }

    public function imageSave(ImageModel $image, int|null $id, ImageLocationEnum $location, string $itemName): int|null
    {
        $imageEncoded = json_encode($image);

        if (($image === ImageLocationEnum::GALLERY && isset($id)) || ($image !== ImageLocationEnum::GALLERY && isset($id))) {
            switch ($location) {
                case ImageLocationEnum::HOME:
                    $this->_imageRepository->imageUpdateHome($imageEncoded, $itemName, $id);
                    break;
                case ImageLocationEnum::TEAM_MEMBERS:
                    $this->_imageRepository->imageUpdateTeamMembers($imageEncoded, $id);
                    break;
                case ImageLocationEnum::ACTIONS:
                    $this->_imageRepository->imageUpdateActions($imageEncoded, $itemName, $id);
                    break;
                case ImageLocationEnum::ACTION_DETAILS:
                    $this->_imageRepository->imageUpdateActionDetails($imageEncoded, $id);
                    break;
                case ImageLocationEnum::GALLERY:
                    $this->_imageRepository->imageUpdateGallery($imageEncoded, $itemName, $id);
                    break;
                case ImageLocationEnum::GALLERY_IMAGE:
                    $this->_imageRepository->imageUpdateGalleryImage($imageEncoded, $id);
                    break;
                case ImageLocationEnum::CONTACT:
                    $this->_imageRepository->imageUpdateContact($imageEncoded, $itemName, $id);
                    break;
            }

            return null;
        } else {
            switch ($location) {
                case ImageLocationEnum::GALLERY_IMAGE:
                    return $this->_imageRepository->imageInsertGalleryImage($imageEncoded);
                default:
                    return null;
            }
        }
    }

    public function imageDelete(int|null $id, ImageLocationEnum $location, string $itemName): void
    {
        if (isset($id)) {
            $image = new ImageModel(
                '',
                '',
                ''
            );
            $imageEncoded = json_encode($image);

            switch ($location) {
                case ImageLocationEnum::HOME:
                    $this->_imageRepository->imageUpdateHome($imageEncoded, $itemName, $id);
                    break;
                case ImageLocationEnum::TEAM_MEMBERS:
                    $this->_imageRepository->imageUpdateTeamMembers($imageEncoded, $id);
                    break;
                case ImageLocationEnum::ACTIONS:
                    $this->_imageRepository->imageUpdateActions($imageEncoded, $itemName, $id);
                    break;
                case ImageLocationEnum::ACTION_DETAILS:
                    $this->_imageRepository->imageUpdateActionDetails($imageEncoded, $id);
                    break;
                case ImageLocationEnum::GALLERY:
                    $this->_imageRepository->imageUpdateGallery($imageEncoded, $itemName, $id);
                    break;
                case ImageLocationEnum::GALLERY_IMAGE:
                    $this->_imageRepository->imageUpdateGalleryImage($imageEncoded, $id);
                    break;
                case ImageLocationEnum::CONTACT:
                    $this->_imageRepository->imageUpdateContact($imageEncoded, $itemName, $id);
                    break;
            }
        }
    }
}
