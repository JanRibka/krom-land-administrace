<?php

namespace kromLand\api\models\webParts\gallery;

class GalleryImageModel
{
    public $Id;
    public $Image;

    public function __construct(
    $id,
    $image
  ) {
        $this->Id = $id;
        $this->Image = $image;
    }
}
