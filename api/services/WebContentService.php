<?php

namespace kromLand\api\services;

require_once __DIR__.'/./IWebContentService.php';

use kromLand\api\models\webContent\actions\ActionsModel;
use kromLand\api\models\webContent\conditions\ConditionsModel;
use kromLand\api\models\webContent\contact\ContactModel;
use kromLand\api\models\webContent\gallery\GalleryModel;
use kromLand\api\models\webContent\home\HomeModel;
use kromLand\api\repositories\IWebContentRepository;

class WebContentService implements IWebContentService
{
    private readonly IWebContentRepository $_webContentRepository;

    public function __construct(IWebContentRepository $pWebContentRepository)
    {
        $this->_webContentRepository = $pWebContentRepository;
    }

    public function getHome(int $id): HomeModel
    {
        $home = $this->_webContentRepository->getHome($id);
        $home->TeamMembers = $this->getTeamMembers();

        return $home;
    }

    public function getTeamMembers(): array
    {
        return $this->_webContentRepository->getTeamMembers();
    }

    public function getActions(int $id): ActionsModel
    {
        $actions = $this->_webContentRepository->getActions($id);
        $actions->ActionDetails = $this->getActionDetails($id);
        $actions->DocumentsToDownload = $this->getDocumentsToDownload();

        return $actions;
    }

    public function getActionDetails(int $actionId): array
    {
        return $this->_webContentRepository->getActionDetails($actionId);
    }

    public function getDocumentsToDownload(): array
    {
        return $this->_webContentRepository->getDocumentsToDownload();
    }

    public function getGallery(int $id): GalleryModel
    {
        $gallery = $this->_webContentRepository->getGallery($id);
        $gallery->Images = $this->getGalleryImages();

        return $gallery;
    }

    public function getGalleryImages(): array
    {
        return $this->_webContentRepository->getGalleryImages();
    }

    public function getContact(int $id): ContactModel
    {
        return $this->_webContentRepository->getContact($id);
    }

    public function getGdpr(int $id): ConditionsModel
    {
        return $this->_webContentRepository->getGdpr($id);
    }

    public function getTermsOfConditions(int $id): ConditionsModel
    {
        return $this->_webContentRepository->getTermsOfConditions($id);
    }
}
