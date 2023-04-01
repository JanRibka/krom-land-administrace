<?php
require_once __DIR__ . "/../db/db.php";
require_once __DIR__ . "/./models/actionsModel.php";
require_once __DIR__ . "/./models/galleryModel.php";
require_once __DIR__ . "/./models/webPartsModel.php";
require_once __DIR__ . "/./models/resultModel.php";
require_once __DIR__ . "/./models/homeModel.php";

class WebContent
{
  public static function getAll()
  {
    $homeId = 1;
    $actionsId = 1;
    $galleryId = 1;
    $contactId = 1;
    $conditionsId = 1;

    try {
      // Home
      $homeQuery = dibi::query(
        "SELECT * FROM home as h WHERE h.Id = %i",
        $homeId
      );
      $home = $homeQuery->fetch();

      $teamMembers = dibi::query("SELECT * FROM teamMembers as tm");

      $home = new HomeModel(
        $home->Id,
        $home->Title,
        $home->Description,
        $home->PageHeaderTextMain,
        $home->PageHeaderTextMainColor,
        $home->PageHeaderTextSecondary,
        $home->PageHeaderTextSecondaryColor,
        $home->MainImage,
        $home->AboutUs,
        $home->AboutUsImage,
        $home->PeopleSay1Text,
        $home->PeopleSay1Name,
        $home->PeopleSay2Text,
        $home->PeopleSay2Name,
        $home->PeopleSay3Text,
        $home->PeopleSay3Name,
        $teamMembers->fetchAll()
      );

      // Actions
      $actinsQuery = dibi::query(
        "SELECT * FROM actions as a WHERE a.Id = %i",
        $actionsId
      );
      $actions = $actinsQuery->fetch();

      $actinDeatilsQuery = dibi::query(
        "SELECT ad.* FROM actions as a JOIN actionDetails as ad on a.Id = ad.ActionsId WHERE a.Id = %i",
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
        $actions->MainImage,
        $actions->EmailKromLand,
        $actinDeatilsQuery->fetchAll(),
        $documentsToDownloadQuery->fetchAll()
      );

      // Gallery
      $galleryQuery = dibi::query(
        "SELECT * FROM gallery as g WHERE g.Id = %i",
        $galleryId
      );

      $gallery = $galleryQuery->fetch();

      $galleryImagesQuery = dibi::query(
        "SELECT * FROM galleryImages"        
      );

      $gallery = new GalleryModel(
        $gallery->Id,
        $gallery->Title,
        $gallery->Description,
        $gallery->PageHeaderTextMain,
        $gallery->PageHeaderTextMainColor,
        $gallery->MainImage,
        $gallery->ExternalGalleryLink,     
        $galleryImagesQuery->fetchAll()
      );

      // Contact
      $contactQuery = dibi::query(
        "SELECT * FROM contact as c WHERE c.Id = %i",
        $contactId
      );

      $contact = $contactQuery->fetch();

      // Conditions
      $conditions = dibi::query("SELECT * FROM conditions as c WHERE c.Id = %i", $conditionsId)->fetch();

      // Web parts
      $webParts = new WebPartsModel($home, $actions, $gallery, $contact, $conditions);

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
    $conditionsId = 1;

    try
    {
      $jsonData = file_get_contents('php://input');
      $data = json_decode($jsonData);
      $webParts = $data->WebParts;
      $home = $webParts->Home;
      $actions = $webParts->Actions;
      $actionDetails = $actions->ActionDetails;
      $gallery = $webParts->Gallery;
      $contact = $webParts->Contact;
      $conditions = $webParts->Conditions;

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

      // Team members
      $teamMembersQuery = dibi::query("SELECT * FROM teamMembers as tm");
      $teamMembersDb = $teamMembersQuery->fetchAll();
      $teamMembers = $home->TeamMembers;

      foreach ($teamMembers as $member) {
        $id = $member->Id;
        $item = array_filter($teamMembersDb, function($f) use ($id) {
          if ($f->Id == $id) {
            return $f;
          }
        });

        if ($member->Delete) {

          dibi::query("DELETE FROM teamMembers as tm WHERE tm.Id = %i", $id);

          $image = json_decode($member->Image);
          $imageName = $image->Name;
          $imagePath = __DIR__ . "/../../publicImg/" . $imageName;
          
          if(file_exists($imagePath)) {
            unlink($imagePath);
          }
        } else if (count($item) > 0) {
          dibi::query(
            'UPDATE teamMembers as tm SET', [
              "Name" => $member->Name,
              "Text" => $member->Text                 
            ],         
            'WHERE tm.Id = %i',
            $id
          );            
        } else {
          $arr = [            
            "Name" => $member->Name,
            "Text" => $member->Text,
            "Image" => $member->Image
          ];

          dibi::query("INSERT INTO teamMembers", $arr);
        }
      }

      // Actions
      dibi::query(
        'UPDATE actions as a SET', [
          'Title' => $actions->Title,
          'Description' => $actions->Description,
          'PageHeaderTextMain' => $actions->PageHeaderTextMain,
          'PageHeaderTextMainColor' => $actions->PageHeaderTextMainColor,
          "EmailKromLand" => $actions->EmailKromLand
        ],         
        'WHERE a.Id = %i',
        $actionsId
      );

      // Action details
      foreach ($actionDetails as $detail) {
        dibi::query(
          'UPDATE actionDetails as ad SET', [            
            'ActionOrder' => $detail->ActionOrder,
            'MonthName' => $detail->MonthName,                               
            'ActionName' => $detail->ActionName,
            'ActionDescritption' => $detail->ActionDescritption,
            'VideoLink' => $detail->VideoLink,
            'Price' => $detail->Price,
            "IsPriceRemark" => $detail->IsPriceRemark,
            "PriceRemark" => $detail->PriceRemark,
            'Place' => $detail->Place,
            'Date' => $detail->Date,
            "CapacityFull" => $detail->CapacityFull
          ],         
          'WHERE ad.Id = %i',
          $detail->Id
        );
      }

      // Gallery
      dibi::query(
        'UPDATE gallery as g SET', [
          'Title' => $gallery->Title,
          'Description' => $gallery->Description,
          'PageHeaderTextMain' => $gallery->PageHeaderTextMain,
          'PageHeaderTextMainColor' => $gallery->PageHeaderTextMainColor,
          "ExternalGalleryLink" => $gallery->ExternalGalleryLink      
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
          'GoogleMapsUrl' => $contact->GoogleMapsUrl,
          "Email" => $contact->Email
        ],         
        'WHERE c.Id = %i',
        $contactId
      );
      
      // Conditions
      dibi::query(
        'UPDATE conditions as c SET', [
          'GdprLabel' => $conditions->GdprLabel,
          'GdprText' => $conditions->GdprText,
          'TermsOfConditionsLabel' => $conditions->TermsOfConditionsLabel,
          'TermsOfConditionsText' => $conditions->TermsOfConditionsText          
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
?>
