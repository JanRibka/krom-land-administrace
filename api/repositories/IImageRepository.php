<?php

namespace kromLand\api\repositories;

interface IImageRepository
{
    public function imageUpdateHome(string $image, string $itemName, int $homeId): void;

    public function imageInsertTeamMembers(string $image): int;

    public function imageUpdateTeamMembers(string $image, int $teamMemberId): void;

    public function imageUpdateActions(string $image, string $itemName, int $actionsId): void;

    public function imageUpdateActionDetails(string $image, int $actionDetailId): void;

    public function imageInsertGalleryImage(string $image): int;

    public function imageUpdateGallery(string $image, string $itemName, int $galleryId): void;

    public function imageUpdateGalleryImage(string $image, int $galleryImageId): void;

    public function imageUpdateContact(string $image, string $itemName, int $contactId): void;

    public function imageDeleteGalleryImage(int $galleryImageId): void;
}
