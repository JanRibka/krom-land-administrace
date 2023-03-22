<?php
class ActionsModel
{
  public $Id;
  public $Title;
  public $Description;
  public $PageHeaderTextMain;
  public $PageHeaderTextMainColor;  
  public $MainImage;
  public $ActionDetails;
  public $DocumentsToDownload;

  public function __construct(
    $id,
    $title,
    $description,
    $pageHeaderTextMain,
    $pageHeaderTextMainColor,    
    $mainImage,    
    $actionDetails,
    $documentsToDownload,
  ) {
    $this->Id = $id;
    $this->Title = $title;
    $this->Description = $description;
    $this->PageHeaderTextMain = $pageHeaderTextMain;
    $this->PageHeaderTextMainColor = $pageHeaderTextMainColor;    
    $this->MainImage = $mainImage;    
    $this->ActionDetails = $actionDetails;
    $this->DocumentsToDownload = $documentsToDownload;
  }
}
?>