<?php

namespace kromLand\api\services;

use kromLand\api\models\webContent\actions\ActionsModel;
use kromLand\api\models\webContent\conditions\ConditionsModel;
use kromLand\api\models\webContent\contact\ContactModel;
use kromLand\api\models\webContent\gallery\GalleryModel;
use kromLand\api\models\webContent\home\HomeModel;

interface IWebContentService
{
    public function getHome(int $id): HomeModel;

    public function getTeamMembers(): array;

    public function getActions(int $id): ActionsModel;

    public function getActionDetails(int $actionId): array;

    public function getDocumentsToDownload(): array;

    public function getGallery(int $id): GalleryModel;

    public function getGalleryImages(): array;

    public function getContact(int $id): ContactModel;

    public function getGdpr(int $id): ConditionsModel;

    public function getTermsOfConditions(int $id): ConditionsModel;
}
