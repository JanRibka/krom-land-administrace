<?php

namespace kromLand\api\models\webContent\gallery;

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
