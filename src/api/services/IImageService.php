<?php

namespace kromLand\api\services;

use kromLand\api\enums\ImageLocationEnum;
use kromLand\api\models\image\ImageModel;

interface IImageService
{
    public function imageSave(ImageModel $image, int|null $id, ImageLocationEnum $location, string $itemName): int|null;

    public function imageDelete(int|null $id, ImageLocationEnum $location, string $itemName, ?int $imageId = null): void;
}
