<?php

namespace kromLand\api\services;

require_once __DIR__.'/./IWebPartsService.php';

use kromLand\api\models\webParts\actions\ActionsModel;
use kromLand\api\models\webParts\conditions\ConditionsModel;
use kromLand\api\models\webParts\contact\ContactModel;
use kromLand\api\models\webParts\gallery\GalleryModel;
use kromLand\api\models\webParts\home\HomeModel;
use kromLand\api\repositories\IWebPartsRepository;

class WebPartsService implements IWebPartsService
{
    private readonly IWebPartsRepository $_webPartsRepository;

    public function __construct(IWebPartsRepository $pWebPartsRepository)
    {
        $this->_webPartsRepository = $pWebPartsRepository;
    }

    public function getHome(int $id): HomeModel
    {
        $home = $this->_webPartsRepository->getHome($id);
        $home->TeamMembers = $this->getTeamMembers();

        return $home;
    }

    public function getTeamMembers(): array
    {
        return $this->_webPartsRepository->getTeamMembers();
    }

    public function getActions(int $id): ActionsModel
    {
        $actions = $this->_webPartsRepository->getActions($id);
        $actions->ActionDetails = $this->getActionDetails($id);
        $actions->DocumentsToDownload = $this->getDocumentsToDownload();

        return $actions;
    }

    public function getActionDetails(int $actionId): array
    {
        return $this->_webPartsRepository->getActionDetails($actionId);
    }

    public function getDocumentsToDownload(): array
    {
        return $this->_webPartsRepository->getDocumentsToDownload();
    }

    public function getGallery(int $id): GalleryModel
    {
        $gallery = $this->_webPartsRepository->getGallery($id);
        $gallery->Images = $this->getGalleryImages();

        return $gallery;
    }

    public function getGalleryImages(): array
    {
        return $this->_webPartsRepository->getGalleryImages();
    }

    public function getContact(int $id): ContactModel
    {
        return $this->_webPartsRepository->getContact($id);
    }

    public function getGdpr(int $id): ConditionsModel
    {
        return $this->_webPartsRepository->getGdpr($id);
    }

    public function gdprUpdate(ConditionsModel $conditions): void
    {
        $this->_webPartsRepository->gdprUpdate($conditions);
    }

    public function getTermsOfConditions(int $id): ConditionsModel
    {
        return $this->_webPartsRepository->getTermsOfConditions($id);
    }

    public function termsOfConditionsUpdate(ConditionsModel $conditions): void
    {
        $this->_webPartsRepository->termsOfConditionsUpdate($conditions);
    }
}
