<?php

namespace kromLand\api\models\webParts\contact;

class ContactModel
{
    public $Id;
    public $Title;
    public $Description;
    public $PageHeaderTextMain;
    public $PageHeaderTextMainColor;
    public $MainImage;
    public $GoogleMapsUrl;
    public $Email;

    public function __construct(
    $id,
    $title,
    $description,
    $pageHeaderTextMain,
    $pageHeaderTextMainColor,
    $mainImage,
    $googleMapsUrl,
    $email,
  ) {
        $this->Id = $id;
        $this->Title = $title;
        $this->Description = $description;
        $this->PageHeaderTextMain = $pageHeaderTextMain;
        $this->PageHeaderTextMainColor = $pageHeaderTextMainColor;
        $this->MainImage = $mainImage;
        $this->GoogleMapsUrl = $googleMapsUrl;
        $this->Email = $email;
    }
}
