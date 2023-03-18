<?php
class HomeModel
{
  public $Id;
  public $Title;
  public $Description;
  public $PageHeaderTextMain;
  public $PageHeaderTextMainColor;
  public $PageHeaderTextSecondary;
  public $PageHeaderTextSecondaryColor;
  public $MainImage;
  public $AboutUs;
  public $AboutUsImage;
  public $PeopleSay1Text;
  public $PeopleSay1Name;
  public $PeopleSay2Text;
  public $PeopleSay2Name;
  public $PeopleSay3Text;
  public $PeopleSay3Name;
  public $TeamMembers;

  public function __construct(
    $id,
    $title,
    $description,
    $pageHeaderTextMain,
    $pageHeaderTextMainColor,
    $pageHeaderTextSecondary,
    $pageHeaderTextSecondaryColor,
    $mainImage,
    $aboutUs,
    $aboutUsImage,
    $peopleSay1Text,
    $peopleSay1Name,
    $peopleSay2Text,
    $peopleSay2Name,
    $peopleSay3Text,
    $peopleSay3Name,
    $teamMembers
  ) {
    $this->Id = $id;
    $this->Title = $title;
    $this->Description = $description;
    $this->PageHeaderTextMain = $pageHeaderTextMain;
    $this->PageHeaderTextMainColor = $pageHeaderTextMainColor;
    $this->PageHeaderTextSecondary = $pageHeaderTextSecondary;
    $this->PageHeaderTextSecondaryColor = $pageHeaderTextSecondaryColor;
    $this->MainImage = $mainImage;
    $this->AboutUs = $aboutUs;
    $this->AboutUsImage = $aboutUsImage;
    $this->PeopleSay1Text = $peopleSay1Text;
    $this->PeopleSay1Name = $peopleSay1Name;
    $this->PeopleSay2Text = $peopleSay2Text;
    $this->PeopleSay2Name = $peopleSay2Name;
    $this->PeopleSay3Text = $peopleSay3Text;
    $this->PeopleSay3Name = $peopleSay3Name;
    $this->TeamMembers = $teamMembers;
  }
}
?>
