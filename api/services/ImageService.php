<?php

namespace kromLand\api\services;

use kromLand\api\repositories\IImageRepository;

require_once __DIR__.'/./IImageService.php';

class ImageService implements IImageService
{
    private readonly IImageRepository $_imageRepository;

    public function __construct(IImageRepository $imageRepository)
    {
        $this->_imageRepository = $imageRepository;
    }

    public function imageSave(DocumentModel $document, int|null $id): int|null
    {
        $documentEncoded = json_encode($document);

        if (isset($id)) {
            $this->_documentRepository->documentUpdate($documentEncoded, $id);

            return null;
        } else {
            return $this->_documentRepository->documentInsert($documentEncoded);
        }
    }
}
