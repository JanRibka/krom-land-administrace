<?php

namespace kromLand\api\services;

require_once __DIR__ . '/./IWebPartsService.php';

use kromLand\api\models\webParts\home\HomeModel;
use kromLand\api\repositories\IWebPartsRepository;
use kromLand\api\models\webParts\actions\ActionsModel;
use kromLand\api\models\webParts\contact\ContactModel;
use kromLand\api\models\webParts\gallery\GalleryModel;
use kromLand\api\models\webParts\conditions\ConditionsModel;

class WebPartsService implements IWebPartsService
{
    private readonly IWebPartsRepository $_webPartsRepository;
    private readonly IFileService $_fileService;

    public function __construct(IWebPartsRepository $pWebPartsRepository, IFileService $pFileService)
    {
        $this->_webPartsRepository = $pWebPartsRepository;
        $this->_fileService = $pFileService;
    }

    public function getHome(int $id): HomeModel
    {
        $home = $this->_webPartsRepository->getHome($id);
        $home->TeamMembers = $this->getTeamMembers();

        return $home;
    }

    public function homeUpdate(HomeModel $home): void
    {
        $this->_webPartsRepository->homeUpdate($home);
        $this->teamMembersUpdate($home->TeamMembers);
    }

    public function getTeamMembers(): array
    {
        return $this->_webPartsRepository->getTeamMembers();
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
                $this->_webPartsRepository->teamMemberImageDelete($id);

                $image = json_decode($member->Image);
                $imageName = $image->Name;
                $imagePath = __DIR__ . '/../../../publicImg/' . $imageName;

                $this->_fileService->fileDelete($imagePath);
            } elseif (count($item) > 0) {
                $this->_webPartsRepository->teamMemberImageUpdate($member->Name, $member->Description, $id);
            } else {
                $this->_webPartsRepository->teamMemberImageInsert($member->Image, $member->Name, $member->Description);
            }
        }
    }

    public function getActions(int $id): ActionsModel
    {
        $actions = $this->_webPartsRepository->getActions($id);
        $actions->ActionDetails = $this->getActionDetails($id);
        $actions->DocumentsToDownload = $this->getDocumentsToDownload();

        return $actions;
    }

    public function actionsUpdate(ActionsModel $actions, int $actionId): void
    {
        $this->_webPartsRepository->actionsUpdate($actions);
        $this->actionDetailsUpdate($actions->ActionDetails, $actionId);
    }

    public function getActionDetails(int $actionId): array
    {
        return $this->_webPartsRepository->getActionDetails($actionId);
    }

    public function actionDetailsUpdate(array $actionDetails, int $actionId): void
    {
        $actionDetailsDb = $this->getActionDetails($actionId);

        foreach ($actionDetails as $detail) {
            $id = $detail->Id;
            $item = array_filter($actionDetailsDb, function ($f) use ($id, $actionId) {
                if ($f->Id == $id) {
                    return $f;
                }
            });

            if ($detail->Delete) {
                $this->_webPartsRepository->actionDetailDelete($id);

                $image = json_decode($detail->Image);
                $imageName = $image->Name;
                $imagePath = __DIR__ . '/../../../publicImg/' . $imageName;

                $this->_fileService->fileDelete($imagePath);
            } elseif (count($item) > 0) {
                $this->_webPartsRepository->actionDetailsUpdate($detail);
            } else {
                $this->_webPartsRepository->actionDetailsInsert($detail, $actionId);
            }
        }
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

    public function galleryUpdate(GalleryModel $gallery): void
    {
        $this->_webPartsRepository->galleryUpdate($gallery);
    }

    public function getGalleryImages(): array
    {
        return $this->_webPartsRepository->getGalleryImages();
    }

    public function getContact(int $id): ContactModel
    {
        return $this->_webPartsRepository->getContact($id);
    }

    public function contactUpdate(ContactModel $contact): void
    {
        $this->_webPartsRepository->contactUpdate($contact);
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
