<?php

namespace kromLand\api\services;

use kromLand\api\models\image\ImageModel;

interface IImageService
{
    public function imageSave(ImageModel $image, int $id): void;
}
