<?php

namespace kromLand\api\models\webContent\actions;

class ActionsModel
{
    public $Id;
    public $Title;
    public $Description;
    public $PageHeaderTextMain;
    public $PageHeaderTextMainColor;
    public $MainImage;
    public $EmailKromLand;
    public $ActionDetails;
    public $DocumentsToDownload;

    public function __construct(
    $id,
    $title,
    $description,
    $pageHeaderTextMain,
    $pageHeaderTextMainColor,
    $mainImage,
    $emailKromLand,
    $actionDetails,
    $documentsToDownload,
  ) {
        $this->Id = $id;
        $this->Title = $title;
        $this->Description = $description;
        $this->PageHeaderTextMain = $pageHeaderTextMain;
        $this->PageHeaderTextMainColor = $pageHeaderTextMainColor;
        $this->MainImage = $mainImage;
        $this->EmailKromLand = $emailKromLand;
        $this->ActionDetails = $actionDetails;
        $this->DocumentsToDownload = $documentsToDownload;
    }
}
