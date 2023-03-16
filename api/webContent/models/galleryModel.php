<?php
class GalleryModel
{
    public $Id;
    public $Title;
    public $Description;
    public $PageHeaderTextMain;
    public $PageHeaderTextMainColor;
    public $MainImagePath;
    public $MainImageAlt;
    public $Images;

  public function __construct(
    $id,
    $title,
    $description,
    $pageHeaderTextMain,
    $pageHeaderTextMainColor,
    $mainImagePath,
    $mainImageAlt,
    $images,    
    ) {
        $this->Id = $id;
        $this->Images = $images;
        $this->Title = $title;
        $this->Description = $description;
        $this->PageHeaderTextMain = $pageHeaderTextMain;
        $this->PageHeaderTextMainColor = $pageHeaderTextMainColor;
        $this->MainImagePath = $mainImagePath;
        $this->MainImageAlt = $mainImageAlt;    
    }
}
?>