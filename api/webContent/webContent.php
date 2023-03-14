<?php
require_once __DIR__ . "/../db/db.php";

class WebContent
{
  public static function getAll()
  {
    $homeId = 1;
    $actionsId = 1;
    $galleryId = 1;
    $contactId = 1;

    try {
      // Home
      $homeQuery = dibi::query(
        "SELECT * FROM home as h WHERE h.Id = %i",
        $homeId
      );
      $home = $homeQuery->fetch();

      // Actions
      $actinsQuery = dibi::query(
        "SELECT * FROM actions as a WHERE a.Id = %i",
        $actionsId
      );
      $actions = $actinsQuery->fetch();

      $actinDeatilsQuery = dibi::query(
        "SELECT ad.* FROM actions as a JOIN actionDeatil as ad on a.Id = ad.ActionsId WHERE a.Id = %i ORDER BY ad.ActionOrder",
        $actionsId
      );

      $documentsToDownloadQuery = dibi::query(
        "SELECT * FROM documentsToDownload as dtd"
      );

      $actions = new ActionsModel(
        $actions->Id,
        $actions->Title,
        $actions->Description,
        $actions->PageHeaderTextMain,
        $actions->PageHeaderTextMainColor,        
        $actions->MainImagePath,
        $actions->MainImageAlt,
        $actinDeatilsQuery->fetchAll(),
        $documentsToDownloadQuery->fetchAll()
      );

      // Gallery
      $galleryQuery = dibi::query(
        "SELECT * FROM gallery as g WHERE g.Id = %i",
        $galleryId
      );

      $gallery = $galleryQuery->fetch();

      $galleryImageQuery = dibi::query(
        "SELECT gi.* FROM gallery as g JOIN galleryImage as gi on g.Id = gi.GalleryId WHERE g.Id = %i",
        $galleryId
      );

      $gallery = new GalleryModel(
        $gallery->Id,
        $gallery->Title,
        $gallery->Description,
        $gallery->PageHeaderTextMain,
        $gallery->PageHeaderTextMainColor,
        $gallery->MainImagePath,
        $gallery->MainImageAlt,
        $galleryImageQuery->fetchAll()
      );

      // Contact
      $contactQuery = dibi::query(
        "SELECT * FROM contact as c WHERE c.Id = %i",
        $contactId
      );

      $contact = $contactQuery->fetch();

      // Web parts
      $webParts = new WebPartsModel($home, $actions, $gallery, $contact);

      // Result
      $result = new ResultModel($webParts);

      apiResponse(true, "", $result);
    } catch (Exception $ex) {
      apiResponse(false, $ex->getMessage());
    }
  }

  public static function saveAll()
  {
    $homeId = 1;
    $actionsId = 1;
    $galleryId = 1;
    $contactId = 1;

    try
    {
      $jsonData = file_get_contents('php://input');
      $data = json_decode($jsonData);
      $webParts = $data->WebParts;
      $home = $webParts->Home;
      $actions = $webParts->Actions;
      $gallery = $webParts->Gallery;
      $contact = $webParts->Contact;

      // Home
      dibi::query(
        'UPDATE home as h SET', [
          'Title' => $home->Title,
          'Description' => $home->Description,
          'PageHeaderTextMain' => $home->PageHeaderTextMain,
          'PageHeaderTextMainColor' => $home->PageHeaderTextMainColor,
          'PageHeaderTextSecondary' => $home->PageHeaderTextSecondary,
          'PageHeaderTextSecondaryColor' => $home->PageHeaderTextSecondaryColor,
          'AboutUs' => $home->AboutUs,
          'MainImagePath' => $home->MainImagePath,
          'MainImageAlt' => $home->MainImageAlt,
          'AboutUsImagePath' => $home->AboutUsImagePath,
          'AboutUsImageAlt' => $home->AboutUsImageAlt,
          'PeopleSay1Text' => $home->PeopleSay1Text,
          'PeopleSay1Name' => $home->PeopleSay1Name,
          'PeopleSay2Text' => $home->PeopleSay2Text,
          'PeopleSay2Name' => $home->PeopleSay2Name,
          'PeopleSay3Text' => $home->PeopleSay3Text,
          'PeopleSay3Name' => $home->PeopleSay3Name
        ],         
        'WHERE h.Id = %i',
        $homeId
      );

      // Actions
      dibi::query(
        'UPDATE actions as a SET', [
          'Title' => $actions->Title,
          'Description' => $actions->Description,
          'PageHeaderTextMain' => $actions->PageHeaderTextMain,
          'PageHeaderTextMainColor' => $actions->PageHeaderTextMainColor,                    
          'MainImagePath' => $actions->MainImagePath,
          'MainImageAlt' => $actions->MainImageAlt,          
        ],         
        'WHERE a.Id = %i',
        $actionsId
      );

      // Gallery
      dibi::query(
        'UPDATE gallery as g SET', [
          'Title' => $gallery->Title,
          'Description' => $gallery->Description,
          'PageHeaderTextMain' => $gallery->PageHeaderTextMain,
          'PageHeaderTextMainColor' => $gallery->PageHeaderTextMainColor,                    
          'MainImagePath' => $gallery->MainImagePath,
          'MainImageAlt' => $gallery->MainImageAlt,          
        ],         
        'WHERE g.Id = %i',
        $galleryId
      );      

      // Contact
      dibi::query(
        'UPDATE contact as c SET', [
          'Title' => $contact->Title,
          'Description' => $contact->Description,
          'PageHeaderTextMain' => $contact->PageHeaderTextMain,
          'PageHeaderTextMainColor' => $contact->PageHeaderTextMainColor,                    
          'MainImagePath' => $contact->MainImagePath,
          'MainImageAlt' => $contact->MainImageAlt,          
          'GoogleMapsUrl' => $contact->GoogleMapsUrl,
        ],         
        'WHERE c.Id = %i',
        $contactId
      );        

      apiResponse(true, "");
    } catch(Exception $ex)
    {
      apiResponse(false, $ex->getMessage());
    }
  }
}




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
    $this->PageHeaderTextMainColor = $pageHeaderTextMain;
    $this->PageHeaderTextMainColor = $pageHeaderTextMainColor;    
    $this->MainImagePath = $mainImagePath;
    $this->MainImageAlt = $mainImageAlt;
    $this->ActionDetails = $actionDetails;
    $this->DocumentsToDownload = $documentsToDownload;
  }
}

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
    $this->PageHeaderTextMainColor = $pageHeaderTextMain;
    $this->PageHeaderTextMainColor = $pageHeaderTextMainColor;
    $this->MainImagePath = $mainImagePath;
    $this->MainImageAlt = $mainImageAlt;    
  }
}

class WebPartsModel
{
  public $Home;
  public $Actions;
  public $Gallery;
  public $Contact;

  public function __construct($home, $actions, $gallery, $contact)
  {
    $this->Home = $home;
    $this->Actions = $actions;
    $this->Gallery = $gallery;
    $this->Contact = $contact;
  }
}
class ResultModel
{
  public $WebParts;

  public function __construct($webParts)
  {
    $this->WebParts = $webParts;
  }
}


?>
