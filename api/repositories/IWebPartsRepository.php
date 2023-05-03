<?php

namespace kromLand\api\repositories;

use kromLand\api\models\webParts\actions\ActionsModel;
use kromLand\api\models\webParts\conditions\ConditionsModel;
use kromLand\api\models\webParts\contact\ContactModel;
use kromLand\api\models\webParts\gallery\GalleryModel;
use kromLand\api\models\webParts\home\HomeModel;

interface IWebPartsRepository
{
    public function getHome(int $id): HomeModel;

    public function homeUpdate(HomeModel $home): void;

    public function getTeamMembers(): array;

    public function teamMembersUpdate(array $teamMembers): void;

    public function getActions(int $id): ActionsModel;

    public function actionsUpdate(ActionsModel $actions): void;

    public function getActionDetails(int $actionId): array;

    public function actionDetailsUpdate(array $actionDetails): void;

    public function getDocumentsToDownload(): array;

    public function getGallery(int $id): GalleryModel;

    public function galleryUpdate(GalleryModel $gallery): void;

    public function getGalleryImages(): array;

    public function getContact(int $id): ContactModel;

    public function contactUpdate(ContactModel $contact): void;

    public function getGdpr(int $id): ConditionsModel;

    public function gdprUpdate(ConditionsModel $conditions): void;

    public function getTermsOfConditions(int $id): ConditionsModel;

    public function termsOfConditionsUpdate(ConditionsModel $conditions): void;
}
