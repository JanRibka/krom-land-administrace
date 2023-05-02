<?php

namespace kromLand\api\repositories;

require_once __DIR__.'/../config/db.php';
require_once __DIR__.'/../../vendor/autoload.php';
require_once __DIR__.'/../../vendor/dibi/dibi/src/Dibi/dibi.php';
require_once __DIR__.'/../models/webContent/home/TeamMemberModel.php';
require_once __DIR__.'/../models/webContent/home/HomeModel.php';
require_once __DIR__.'/../models/webContent/actions/ActionsModel.php';
require_once __DIR__.'/../models/webContent/actions/ActionDetailModel.php';
require_once __DIR__.'/../models/webContent/actions/DocumentToDownloadModel.php';
require_once __DIR__.'/../models/webContent/gallery/GalleryModel.php';
require_once __DIR__.'/../models/webContent/gallery/GalleryImageModel.php';
require_once __DIR__.'/../models/webContent/contact/ContactModel.php';
require_once __DIR__.'/../models/webContent/conditions/ConditionsModel.php';
require_once __DIR__.'/./IWebContentRepository.php';

use kromLand\api\models\webContent\actions\ActionDetailModel;
use kromLand\api\models\webContent\actions\ActionsModel;
use kromLand\api\models\webContent\actions\DocumentToDownloadModel;
use kromLand\api\models\webContent\conditions\ConditionsModel;
use kromLand\api\models\webContent\contact\ContactModel;
use kromLand\api\models\webContent\gallery\GalleryImageModel;
use kromLand\api\models\webContent\gallery\GalleryModel;
use kromLand\api\models\webContent\home\HomeModel;
use kromLand\api\models\webContent\home\TeamMemberModel;

class WebContentRepository implements IWebContentRepository
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
}
