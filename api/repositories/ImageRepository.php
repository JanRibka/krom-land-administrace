<?php

namespace kromLand\api\repositories;

require_once __DIR__.'/../config/db.php';
require_once __DIR__.'/./IImageRepository.php';

class ImageRepository implements IImageRepository
{
    public function imageInsertGalleryImage(string $image): int
    {
        $arr = [
            'Image' => json_encode($image),
        ];

        \dibi::query(
            'INSERT INTO galleryImages',
            $arr
        );

        return \dibi::getInsertId();
    }

    public function imageSaveHome(string $image, string $itemName, int $homeId): void
    {
        $arr = [
            $itemName => $image,
        ];

        \dibi::query(
            'UPDATE home as h SET', $arr,
            'WHERE h.Id = %i',
            $homeId
        );
    }

    public function imageUpdateHome(string $image, string $itemName, int $homeId): void
    {
        $arr = [
            $itemName => json_encode($image),
        ];

        \dibi::query(
            'UPDATE home as h SET',
            $arr,
            'WHERE h.Id = %i',
            $homeId
        );
    }

    public function imageUpdateTeamMembers(string $image, int $teamMemberId): void
    {
        $arr = [
            'Image' => json_encode($image),
        ];

        \dibi::query(
            'UPDATE teamMembers as tm SET',
            $arr,
            'WHERE tm.Id = %i',
            $teamMemberId
        );
    }

    public function imageUpdateActions(string $image, string $itemName, int $actionsId): void
    {
        $arr = [
            $itemName => json_encode($image),
        ];

        \dibi::query(
            'UPDATE actions as a SET',
            $arr,
            'WHERE a.Id = %i',
            $actionsId
        );
    }

    public function imageUpdateActionDetails(string $image, int $actionDetailId): void
    {
        $arr = [
            'Image' => json_encode($image),
        ];

        \dibi::query(
            'UPDATE actionDetails as ad SET',
            $arr,
            'WHERE ad.Id = %i',
            $actionDetailId
        );
    }

    public function imageUpdateGallery(string $image, string $itemName, int $galleryId): void
    {
        $arr = [
            $itemName => json_encode($image),
        ];

        \dibi::query(
            'UPDATE gallery as g SET',
            $arr,
            'WHERE g.Id = %i',
            $galleryId
        );
    }

    public function imageUpdateGalleryImage(string $image, int $galleryImageId): void
    {
        $arr = [
            'Image' => json_encode($image),
        ];

        \dibi::query(
            'UPDATE galleryImages as gi SET', $arr,
            'WHERE gi.Id = %i',
            $galleryImageId
        );
    }

    public function imageUpdateContact(string $image, string $itemName, int $contactId): void
    {
        $arr = [
            $itemName => json_encode($image),
        ];

        \dibi::query(
            'UPDATE contact as c SET', $arr,
            'WHERE c.Id = %i',
            $contactId
        );
    }

    public function imageDeleteGalleryImage(int $galleryImageId): void
    {
        \dibi::query('DELETE FROM galleryImages as gi WHERE gi.Id = %i', $galleryImageId);
    }
}
