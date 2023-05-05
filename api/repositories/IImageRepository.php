<?php

namespace kromLand\api\repositories;

interface IImageRepository
{
    public function imageInsertGalleryImage(string $image, string $imageName, string $description): int;

    public function imageUpdate(string $name, string $description, int $id): void;

    public function imageUpdateHome(string $image, string $imageName, int $homeId): void;

    public function imageUpdateTeamMembers(string $image, string $imageName, int $homeId): void;

    public function imageUpdateActions(string $image, string $imageName, int $homeId): void;

    public function imageUpdateActionDetails(string $image, string $imageName, int $homeId): void;

    public function imageUpdateGallery(string $image, string $imageName, int $homeId): void;

    public function imageUpdateGalleryImage(string $image, string $imageName, int $homeId): void;

    public function imageUpdateContact(string $image, string $imageName, int $homeId): void;

    public function imageDeleteGalleryImage(int $id): void;
}
