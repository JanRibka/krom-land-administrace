<?php
class ActionsModel
{
  public $Id;
  public $Title;
  public $Description;
  public $PageHeaderTextMain;
  public $PageHeaderTextMainColor;  
  public $MainImagePath;
  public $MainImageAlt;
  public $ActionDetails;
  public $DocumentsToDownload;

  public function __construct(
    $id,
    $title,
    $description,
    $pageHeaderTextMain,
    $pageHeaderTextMainColor,    
    $mainImagePath,
    $mainImageAlt,
    $actionDetails,
    $documentsToDownload,
  ) {
    $this->Id = $id;
    $this->Title = $title;
    $this->Description = $description;
    $this->PageHeaderTextMain = $pageHeaderTextMain;
    $this->PageHeaderTextMainColor = $pageHeaderTextMainColor;    
    $this->MainImagePath = $mainImagePath;
    $this->MainImageAlt = $mainImageAlt;
    $this->ActionDetails = $actionDetails;
    $this->DocumentsToDownload = $documentsToDownload;
  }
}
?>