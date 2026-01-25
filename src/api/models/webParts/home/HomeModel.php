<?php

namespace kromLand\api\models\webParts\home;

class HomeModel
{
    public $Id;
    public $Title;
    public $Description;
    public $PageHeaderTextMain;
    public $PageHeaderTextMainColor;
    public $PageHeaderTextSecondary;
    public $PageHeaderTextSecondaryColor;
    public $AboutUs;
    public $News;
    public $PeopleSay1Id;
    public $PeopleSay1Text;
    public $PeopleSay1Name;
    public $PeopleSay2Id;
    public $PeopleSay2Text;
    public $PeopleSay2Name;
    public $PeopleSay3Id;
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
        $aboutUs,
        $news,
        $peopleSay1Id,
        $peopleSay1Text,
        $peopleSay1Name,
        $peopleSay2Id,
        $peopleSay2Text,
        $peopleSay2Name,
        $peopleSay3Id,
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
        $this->AboutUs = $aboutUs;
        $this->News = $news;
        $this->PeopleSay1Id = $peopleSay1Id;
        $this->PeopleSay1Text = $peopleSay1Text;
        $this->PeopleSay1Name = $peopleSay1Name;
        $this->PeopleSay2Id = $peopleSay2Id;
        $this->PeopleSay2Text = $peopleSay2Text;
        $this->PeopleSay2Name = $peopleSay2Name;
        $this->PeopleSay3Id = $peopleSay3Id;
        $this->PeopleSay3Text = $peopleSay3Text;
        $this->PeopleSay3Name = $peopleSay3Name;
        $this->TeamMembers = $teamMembers;
    }
}
