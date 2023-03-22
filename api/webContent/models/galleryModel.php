<?php
class GalleryModel
{
    public $Id;
    public $Title;
    public $Description;
    public $PageHeaderTextMain;
    public $PageHeaderTextMainColor;
    public $MainImage;    
    public $Images;

  public function __construct(
    $id,
    $title,
    $description,
    $pageHeaderTextMain,
    $pageHeaderTextMainColor,
    $mainImage,    
    $images,    
    ) {
        $this->Id = $id;
        $this->Title = $title;
        $this->Description = $description;
        $this->PageHeaderTextMain = $pageHeaderTextMain;
        $this->PageHeaderTextMainColor = $pageHeaderTextMainColor;
        $this->MainImage = $mainImage;        
        $this->Images = $images;
    }
}
?>