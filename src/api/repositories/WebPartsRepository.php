<?php

namespace kromLand\api\repositories;

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../vendor/dibi/dibi/src/Dibi/dibi.php';
require_once __DIR__ . '/../models/webParts/home/TeamMemberModel.php';
require_once __DIR__ . '/../models/webParts/home/HomeModel.php';
require_once __DIR__ . '/../models/webParts/actions/ActionsModel.php';
require_once __DIR__ . '/../models/webParts/actions/ActionDetailModel.php';
require_once __DIR__ . '/../models/webParts/actions/DocumentToDownloadModel.php';
require_once __DIR__ . '/../models/webParts/gallery/GalleryModel.php';
require_once __DIR__ . '/../models/webParts/gallery/GalleryImageModel.php';
require_once __DIR__ . '/../models/webParts/contact/ContactModel.php';
require_once __DIR__ . '/../models/webParts/conditions/ConditionsModel.php';
require_once __DIR__ . '/./IWebPartsRepository.php';

use kromLand\api\models\webParts\home\HomeModel;
use kromLand\api\models\webParts\actions\ActionsModel;
use kromLand\api\models\webParts\contact\ContactModel;
use kromLand\api\models\webParts\gallery\GalleryModel;
use kromLand\api\models\webParts\home\TeamMemberModel;
use kromLand\api\models\webParts\actions\ActionDetailModel;
use kromLand\api\models\webParts\gallery\GalleryImageModel;
use kromLand\api\models\webParts\conditions\ConditionsModel;
use kromLand\api\models\webParts\actions\DocumentToDownloadModel;

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
            $home->peopleSay1Id,
            $home->PeopleSay1Text,
            $home->PeopleSay1Name,
            $home->peopleSay2Id,
            $home->PeopleSay2Text,
            $home->PeopleSay2Name,
            $home->peopleSay3Id,
            $home->PeopleSay3Text,
            $home->PeopleSay3Name,
            []
        );

        return $homeModel;
    }

    public function homeUpdate(HomeModel $home): void
    {
        $connection = \dibi::getConnection();
        $transactions = new \Inlm\DibiTransactions\Transactions($connection);

        try {
            $transactions->begin();

            // 1. Update základních dat v tabulce 'home' (zůstává update, protože záznam vždy existuje)
            $homeData = [
                'Title' => $home->Title,
                'Description' => $home->Description,
                'PageHeaderTextMain' => $home->PageHeaderTextMain,
                'PageHeaderTextMainColor' => $home->PageHeaderTextMainColor,
                'PageHeaderTextSecondary' => $home->PageHeaderTextSecondary,
                'PageHeaderTextSecondaryColor' => $home->PageHeaderTextSecondaryColor,
                'AboutUs' => $home->AboutUs,
            ];
            $connection->query("UPDATE home SET %a WHERE IdHome = %i", $homeData, $home->Id);

            // 2. Upsert obrázků v 'homeImage' (insert nebo update na základě (IdHome, Type))
            if (!empty($home->MainImage)) {
                $connection->query("INSERT INTO homeImage (Type, Path, Alt, Name, IdHome) VALUES (%s, %s, %s, %s, %i)
                            ON DUPLICATE KEY UPDATE Path = VALUES(Path), Alt = VALUES(Alt), Name = VALUES(Name)",
                    'main',
                    $home->MainImage,
                    '',
                    '',
                    $home->Id
                );
            }
            if (!empty($home->AboutUsImage)) {
                $connection->query("INSERT INTO homeImage (Type, Path, Alt, Name, IdHome) VALUES (%s, %s, %s, %s, %i)
                            ON DUPLICATE KEY UPDATE Path = VALUES(Path), Alt = VALUES(Alt), Name = VALUES(Name)",
                    'about_us',
                    $home->AboutUsImage,
                    '',
                    '',
                    $home->Id
                );
            }

            // 3. Upsert testimonials v 'homeTestimonials' (na základě IdHomeTestimonial)
            $testimonials = [
                ['IdHomeTestimonial' => $home->PeopleSay1Id, 'Text' => $home->PeopleSay1Text, 'Name' => $home->PeopleSay1Name, 'Order' => 1],
                ['IdHomeTestimonial' => $home->PeopleSay2Id, 'Text' => $home->PeopleSay2Text, 'Name' => $home->PeopleSay2Name, 'Order' => 2],
                ['IdHomeTestimonial' => $home->PeopleSay3Id, 'Text' => $home->PeopleSay3Text, 'Name' => $home->PeopleSay3Name, 'Order' => 3],
            ];
            foreach ($testimonials as $testimonial) {
                if (!empty($testimonial['Text']) && !empty($testimonial['Name'])) {
                    if (!empty($testimonial['IdHomeTestimonial'])) {
                        // update
                        $connection->query(
                            "UPDATE homeTestimonials SET Text = %s, Name = %s WHERE IdHomeTestimonial = %i",
                            $testimonial['Text'],
                            $testimonial['Name'],
                            $testimonial['IdHomeTestimonial']
                        );
                    } else {
                        // insert
                        $connection->query(
                            "INSERT INTO homeTestimonials (Text, Name, `Order`, IdHome) VALUES (%s, %s, %i, %i)",
                            $testimonial['Text'],
                            $testimonial['Name'],
                            $testimonial['Order'],
                            $home->Id
                        );
                    }
                }
            }

            // 4. Update/Insert/Delete team members v 'homeTeamMembers' na základě Id a Delete flag
            if (is_array($home->TeamMembers)) {
                foreach ($home->TeamMembers as $member) {
                    $id = $member->IdHomeTeamMembers ?? 0;
                    $delete = $member->Delete ?? false;
                    $name = $member->Name ?? '';
                    $description = $member->Description ?? '';
                    $imageJson = $member->Image ?? '{}';
                    $imageData = json_decode($imageJson, true);
                    $imagePath = $imageData['path'] ?? '';
                    $imageAlt = $imageData['alt'] ?? '';
                    $imageName = $imageData['name'] ?? '';

                    if ($delete && $id > 0) {
                        // delete
                        $connection->query("DELETE FROM homeTeamMembers WHERE IdHomeTeamMembers = %i", $id);
                    } elseif (!empty($name)) {
                        if ($id > 0) {
                            // update
                            $connection->query(
                                "UPDATE homeTeamMembers SET Name = %s, Description = %s, ImagePath = %s, ImageAlt = %s, ImageName = %s WHERE IdHomeTeamMembers = %i",
                                $name,
                                $description,
                                $imagePath,
                                $imageAlt,
                                $imageName,
                                $id
                            );
                        } else {
                            // insert
                            $connection->query(
                                "INSERT INTO homeTeamMembers (Name, Description, ImagePath, ImageAlt, ImageName, IdHome) VALUES (%s, %s, %s, %s, %s, %i)",
                                $name,
                                $description,
                                $imagePath,
                                $imageAlt,
                                $imageName,
                                $home->Id
                            );
                        }
                    }
                }
            }

            $transactions->commit();
        } catch (\Exception $ex) {
            $transactions->rollback();
            throw new \Exception($ex->getMessage(), $ex->getCode(), $ex);
        }
    }

    public function getTeamMembers(): array
    {
        $result = [];
        $teamMembers = \dibi::query('SELECT * FROM homeTeamMembers as htm')->fetchAll();

        foreach ($teamMembers as $member) {
            $newMember = new TeamMemberModel(
                $member->IdHomeTeamMembers,
                $member->Image = json_encode([
                    'path' => $member->ImagePath,
                    'alt' => $member->ImageAlt,
                    'name' => $member->ImageName,
                ]),
                $member->Name,
                $member->Description,
            );

            array_push($result, $newMember);
        }

        return $result;
    }

    public function teamMemberImageDelete(int $id): void
    {
        \dibi::query('DELETE FROM teamMembers as tm WHERE tm.Id = %i', $id);
    }

    public function teamMemberImageInsert(string $image, string $name, string $description): int
    {
        $arr = [
            'Image' => $image,
            'Name' => $name,
            'Description' => $description,
        ];

        \dibi::query('INSERT INTO teamMembers', $arr);

        $id = \dibi::getInsertId();

        return $id;
    }

    public function teamMemberImageUpdate(string $name, string $description, int $id): void
    {
        $arr = [
            'Name' => $name,
            'Description' => $description,
        ];

        \dibi::query(
            'UPDATE teamMembers as tm SET',
            $arr,
            'WHERE tm.Id = %i',
            $id
        );
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
            'UPDATE actions as a SET',
            [
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
                $detail->DisplayTShirtSize,
            );

            array_push($result, $newDetail);
        }

        return $result;
    }

    public function actionDetailsInsert(mixed $detail, int $actionsId): int
    {
        $arr = [
            'ActionsId' => $actionsId,
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
            'DisplayTShirtSize' => $detail->DisplayTShirtSize,
        ];

        \dibi::query('INSERT INTO actionDetails', $arr);

        $id = \dibi::getInsertId();

        return $id;
    }

    public function actionDetailsUpdate(mixed $detail): void
    {
        \dibi::query(
            'UPDATE actionDetails as ad SET',
            [
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
                'DisplayTShirtSize' => $detail->DisplayTShirtSize,
            ],
            'WHERE ad.Id = %i',
            $detail->Id
        );
    }

    public function actionDetailDelete(int $id): void
    {
        \dibi::query('DELETE FROM actionDetails as tm WHERE tm.Id = %i', $id);
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
            'UPDATE gallery as g SET',
            [
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
            'UPDATE contact as c SET',
            [
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
            'UPDATE conditions as c SET',
            [
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
            'UPDATE conditions as c SET',
            [
                'TermsOfConditionsLabel' => $conditions->Label,
                'TermsOfConditionsText' => $conditions->Text,
            ],
            'WHERE c.Id = %i',
            $conditions->Id
        );
    }
}
