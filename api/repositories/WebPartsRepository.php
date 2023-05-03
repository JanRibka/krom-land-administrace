<?php

namespace kromLand\api\repositories;

require_once __DIR__.'/../config/db.php';
require_once __DIR__.'/../../vendor/autoload.php';
require_once __DIR__.'/../../vendor/dibi/dibi/src/Dibi/dibi.php';
require_once __DIR__.'/../models/webParts/home/TeamMemberModel.php';
require_once __DIR__.'/../models/webParts/home/HomeModel.php';
require_once __DIR__.'/../models/webParts/actions/ActionsModel.php';
require_once __DIR__.'/../models/webParts/actions/ActionDetailModel.php';
require_once __DIR__.'/../models/webParts/actions/DocumentToDownloadModel.php';
require_once __DIR__.'/../models/webParts/gallery/GalleryModel.php';
require_once __DIR__.'/../models/webParts/gallery/GalleryImageModel.php';
require_once __DIR__.'/../models/webParts/contact/ContactModel.php';
require_once __DIR__.'/../models/webParts/conditions/ConditionsModel.php';
require_once __DIR__.'/./IWebPartsRepository.php';

use kromLand\api\models\webParts\actions\ActionDetailModel;
use kromLand\api\models\webParts\actions\ActionsModel;
use kromLand\api\models\webParts\actions\DocumentToDownloadModel;
use kromLand\api\models\webParts\conditions\ConditionsModel;
use kromLand\api\models\webParts\contact\ContactModel;
use kromLand\api\models\webParts\gallery\GalleryImageModel;
use kromLand\api\models\webParts\gallery\GalleryModel;
use kromLand\api\models\webParts\home\HomeModel;
use kromLand\api\models\webParts\home\TeamMemberModel;

class WebPartsRepository implements IWebPartsRepository
{
    public function getHome(int $id): HomeModel
    {
        $home = \dibi::query(
            'SELECT * FROM home as h WHERE h.Id = %i',
            $id
        )->fetch();

        $homeModel = new HomeModel(
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
            []
        );

        return $homeModel;
    }

    public function homeUpdate(HomeModel $home): void
    {
        \dibi::query(
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
              'PeopleSay3Name' => $home->PeopleSay3Name,
            ],
            'WHERE h.Id = %i',
            $home->Id
        );
    }

    public function getTeamMembers(): array
    {
        $result = [];
        $teamMembers = \dibi::query('SELECT * FROM teamMembers as tm')->fetchAll();

        foreach ($teamMembers as $member) {
            $newMember = new TeamMemberModel(
                $member->Id,
                $member->Image,
                $member->Name,
                $member->Description,
            );

            array_push($result, $newMember);
        }

        return $result;
    }

    public function teamMembersUpdate(array $teamMembers): void
    {
        $teamMembersDb = $this->getTeamMembers();

        foreach ($teamMembers as $member) {
            $id = $member->Id;
            $item = array_filter($teamMembersDb, function ($f) use ($id) {
                if ($f->Id == $id) {
                    return $f;
                }
            });

            if ($member->Delete) {
                \dibi::query('DELETE FROM teamMembers as tm WHERE tm.Id = %i', $id);

                $image = json_decode($member->Image);
                $imageName = $image->Name;
                $imagePath = __DIR__.'/../../publicImg/'.$imageName;

                if (file_exists($imagePath)) {
                    unlink($imagePath);
                }
            } elseif (count($item) > 0) {
                \dibi::query(
                    'UPDATE teamMembers as tm SET', [
                      'Name' => $member->Name,
                      'Text' => $member->Text,
                    ],
                    'WHERE tm.Id = %i',
                    $id
                );
            } else {
                $arr = [
                  'Name' => $member->Name,
                  'Text' => $member->Text,
                  'Image' => $member->Image,
                ];

                \dibi::query('INSERT INTO teamMembers', $arr);
            }
        }
    }

    public function getActions(int $id): ActionsModel
    {
        $actions = \dibi::query(
            'SELECT * FROM actions as a WHERE a.Id = %i',
            $id
        )->fetch();

        $actioneModel = new ActionsModel(
            $actions->Id,
            $actions->Title,
            $actions->Description,
            $actions->PageHeaderTextMain,
            $actions->PageHeaderTextMainColor,
            $actions->MainImage,
            $actions->EmailKromLand,
            [],
            []
        );

        return $actioneModel;
    }

    public function actionsUpdate(ActionsModel $actions): void
    {
        \dibi::query(
            'UPDATE actions as a SET', [
              'Title' => $actions->Title,
              'Description' => $actions->Description,
              'PageHeaderTextMain' => $actions->PageHeaderTextMain,
              'PageHeaderTextMainColor' => $actions->PageHeaderTextMainColor,
              'EmailKromLand' => $actions->EmailKromLand,
            ],
            'WHERE a.Id = %i',
            $actions->Id
        );
    }

    public function getActionDetails(int $actionId): array
    {
        $result = [];
        $actinDeatils = \dibi::query(
            'SELECT ad.* FROM actions as a JOIN actionDetails as ad on a.Id = ad.ActionsId WHERE a.Id = %i',
            $actionId
        )->fetchAll();

        foreach ($actinDeatils as $detail) {
            $newDetail = new ActionDetailModel(
                $detail->Id,
                $detail->ActionsId,
                $detail->ActionOrder,
                $detail->MonthName,
                $detail->Image,
                $detail->ActionName,
                $detail->ActionDescritption,
                $detail->VideoLink,
                $detail->Price,
                $detail->IsPriceRemark,
                $detail->PriceRemark,
                $detail->Place,
                $detail->Date,
                $detail->CapacityFull,
            );

            array_push($result, $newDetail);
        }

        return $result;
    }

    public function actionDetailsUpdate(array $actionDetails): void
    {
        foreach ($actionDetails as $detail) {
            \dibi::query(
                'UPDATE actionDetails as ad SET', [
                  'ActionOrder' => $detail->ActionOrder,
                  'MonthName' => $detail->MonthName,
                  'ActionName' => $detail->ActionName,
                  'ActionDescritption' => $detail->ActionDescritption,
                  'VideoLink' => $detail->VideoLink,
                  'Price' => $detail->Price,
                  'IsPriceRemark' => $detail->IsPriceRemark,
                  'PriceRemark' => $detail->PriceRemark,
                  'Place' => $detail->Place,
                  'Date' => $detail->Date,
                  'CapacityFull' => $detail->CapacityFull,
                ],
                'WHERE ad.Id = %i',
                $detail->Id
            );
        }
    }

    public function getDocumentsToDownload(): array
    {
        $result = [];
        $documentsToDownload = \dibi::query(
            'SELECT * FROM documentsToDownload as dtd'
        )->fetchAll();

        foreach ($documentsToDownload as $document) {
            $newDocument = new DocumentToDownloadModel(
                $document->Id,
                $document->Document,
            );

            array_push($result, $newDocument);
        }

        return $result;
    }

    public function getGallery(int $id): GalleryModel
    {
        $gallery = \dibi::query(
            'SELECT * FROM gallery as g WHERE g.Id = %i',
            $id
        )->fetch();

        $galleryModel = new GalleryModel(
            $gallery->Id,
            $gallery->Title,
            $gallery->Description,
            $gallery->PageHeaderTextMain,
            $gallery->PageHeaderTextMainColor,
            $gallery->MainImage,
            $gallery->ExternalGalleryLink,
            []
        );

        return $galleryModel;
    }

    public function galleryUpdate(GalleryModel $gallery): void
    {
        \dibi::query(
            'UPDATE gallery as g SET', [
              'Title' => $gallery->Title,
              'Description' => $gallery->Description,
              'PageHeaderTextMain' => $gallery->PageHeaderTextMain,
              'PageHeaderTextMainColor' => $gallery->PageHeaderTextMainColor,
              'ExternalGalleryLink' => $gallery->ExternalGalleryLink,
            ],
            'WHERE g.Id = %i',
            $gallery->Id
        );
    }

    public function getGalleryImages(): array
    {
        $result = [];
        $galleryImages = \dibi::query(
            'SELECT * FROM galleryImages'
        )->fetchAll();

        foreach ($galleryImages as $image) {
            $newImage = new GalleryImageModel(
                $image->Id,
                $image->Image,
            );

            array_push($result, $newImage);
        }

        return $result;
    }

    public function getContact($id): ContactModel
    {
        $contact = \dibi::query(
            'SELECT * FROM contact as c WHERE c.Id = %i',
            $id
        )->fetch();

        $contactModel = new ContactModel(
            $contact->Id,
            $contact->Title,
            $contact->Description,
            $contact->PageHeaderTextMain,
            $contact->PageHeaderTextMainColor,
            $contact->MainImage,
            $contact->GoogleMapsUrl,
            $contact->Email,
        );

        return $contactModel;
    }

    public function contactUpdate(ContactModel $contact): void
    {
        \dibi::query(
            'UPDATE contact as c SET', [
              'Title' => $contact->Title,
              'Description' => $contact->Description,
              'PageHeaderTextMain' => $contact->PageHeaderTextMain,
              'PageHeaderTextMainColor' => $contact->PageHeaderTextMainColor,
              'GoogleMapsUrl' => $contact->GoogleMapsUrl,
              'Email' => $contact->Email,
            ],
            'WHERE c.Id = %i',
            $contact->Id
        );
    }

    public function getGdpr(int $id): ConditionsModel
    {
        $conditions = \dibi::query('SELECT c.Id, c.GdprLabel, c.GdprText FROM conditions as c WHERE c.Id = %i', $id)->fetch();

        $conditionsModel = new ConditionsModel(
            $conditions->Id,
            $conditions->GdprLabel,
            $conditions->GdprText,
        );

        return $conditionsModel;
    }

    public function gdprUpdate(ConditionsModel $conditions): void
    {
        \dibi::query(
            'UPDATE conditions as c SET', [
              'GdprLabel' => $conditions->Label,
              'GdprText' => $conditions->Text,
            ],
            'WHERE c.Id = %i',
            $conditions->Id
        );
    }

    public function getTermsOfConditions(int $id): ConditionsModel
    {
        $conditions = \dibi::query('SELECT c.Id, c.TermsOfConditionsLabel, c.TermsOfConditionsText FROM conditions as c WHERE c.Id = %i', $id)->fetch();

        $conditionsModel = new ConditionsModel(
            $conditions->Id,
            $conditions->TermsOfConditionsLabel,
            $conditions->TermsOfConditionsText,
        );

        return $conditionsModel;
    }

    public function termsOfConditionsUpdate(ConditionsModel $conditions): void
    {
        \dibi::query(
            'UPDATE conditions as c SET', [
              'TermsOfConditionsLabel' => $conditions->Label,
              'TermsOfConditionsText' => $conditions->Text,
            ],
            'WHERE c.Id = %i',
            $conditions->Id
        );
    }
}
