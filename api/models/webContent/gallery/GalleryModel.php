<?php

namespace kromLand\api\models\webContent\gallery;

class GalleryModel
{
    public $Id;
    public $Title;
    public $Description;
    public $PageHeaderTextMain;
    public $PageHeaderTextMainColor;
    public $MainImage;
    public $ExternalGalleryLink;
    public $Images;

    public function __construct(
    $id,
    $title,
    $description,
    $pageHeaderTextMain,
    $pageHeaderTextMainColor,
    $mainImage,
    $externalGalleryLink,
    $images,
    ) {
        $this->Id = $id;
        $this->Title = $title;
        $this->Description = $description;
        $this->PageHeaderTextMain = $pageHeaderTextMain;
        $this->PageHeaderTextMainColor = $pageHeaderTextMainColor;
        $this->MainImage = $mainImage;
        $this->ExternalGalleryLink = $externalGalleryLink;
        $this->Images = $images;
    }
}
