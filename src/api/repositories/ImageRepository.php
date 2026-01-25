<?php

namespace kromLand\api\repositories;

use kromLand\api\models\image\ImageModel;

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/./IImageRepository.php';

class ImageRepository implements IImageRepository
{
    public function imageSaveHome(string $image, string $itemName, int $homeId): void
    {
        $arr = [
            $itemName => $image,
        ];

        \dibi::query(
            'UPDATE home as h SET',
            $arr,
            'WHERE h.IdHome = %i',
            $homeId
        );
    }

    public function imageUpdateHome(ImageModel $image, string $itemName, int $homeId): void
    {

        if ($itemName === 'NewsImage') {
            \dibi::query('DELETE FROM homeNewsImage as hni WHERE hni.IdHomeNewsImage = %i', $image->Id);
            return;
        }

        // Use ImageModel properties
        $path = $image->Path ?? '';
        $alt = $image->Alt ?? '';
        $name = $image->Name ?? '';

        $type = '';
        if ($itemName === 'MainImage') {
            $type = 'home_main';
        } elseif ($itemName === 'AboutUsImage') {
            $type = 'home_about_us';
        }

        // Check if image with type 'home_main' exists in homeImage table
        $existing = \dibi::query('SELECT IdHomeImage FROM homeImage WHERE IdHome = %i AND Type = %s', $homeId, $type)->fetchSingle();

        if ($existing) {
            // Update existing
            \dibi::query('UPDATE homeImage SET Path = %s, Alt = %s, Name = %s WHERE IdHomeImage = %i', $path, $alt, $name, $existing);
        } else {
            // Insert new
            \dibi::query('INSERT INTO homeImage (Type, Path, Alt, Name, IdHome) VALUES (%s, %s, %s, %s, %i)', $type, $path, $alt, $name, $homeId);
        }
    }

    public function imageInsertTeamMembers(string $image): int
    {
        $arr = [
            'Image' => $image,
        ];

        \dibi::query(
            'INSERT INTO teamMembers',
            $arr
        );

        return \dibi::getInsertId();
    }

    public function imageUpdateTeamMembers(ImageModel $image, int $teamMemberId): void
    {
        $path = $image->Path ?? '';
        $alt = $image->Alt ?? '';
        $name = $image->Name ?? '';

        \dibi::query('UPDATE homeTeamMembers SET ImagePath = %s, ImageAlt = %s, ImageName = %s WHERE IdHomeTeamMembers = %i', $path, $alt, $name, $teamMemberId);
    }

    public function imageUpdateActions(string $image, string $itemName, int $actionsId): void
    {
        $arr = [
            $itemName => $image,
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
            'Image' => $image,
        ];

        \dibi::query(
            'UPDATE actionDetails as ad SET',
            $arr,
            'WHERE ad.Id = %i',
            $actionDetailId
        );
    }

    public function imageInsertGalleryImage(string $image): int
    {
        $arr = [
            'Image' => $image,
        ];

        \dibi::query(
            'INSERT INTO galleryImages',
            $arr
        );

        return \dibi::getInsertId();
    }

    public function imageUpdateGallery(string $image, string $itemName, int $galleryId): void
    {
        $arr = [
            $itemName => $image,
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
            'Image' => $image,
        ];

        \dibi::query(
            'UPDATE galleryImages as gi SET',
            $arr,
            'WHERE gi.Id = %i',
            $galleryImageId
        );
    }

    public function imageUpdateContact(string $image, string $itemName, int $contactId): void
    {
        $arr = [
            $itemName => $image,
        ];

        \dibi::query(
            'UPDATE contact as c SET',
            $arr,
            'WHERE c.Id = %i',
            $contactId
        );
    }

    public function imageDeleteGalleryImage(int $galleryImageId): void
    {
        \dibi::query('DELETE FROM galleryImages as gi WHERE gi.Id = %i', $galleryImageId);
    }

    public function imageUpdateWebLogos(string $image, string $itemName, int $webLogosId): void
    {
        $arr = [
            $itemName => $image,
        ];

        \dibi::update('webLogos', $arr)
            ->where('Id = %i', $webLogosId)
            ->execute();
    }

    public function imageInsertNews(ImageModel $image, int $homeId): int
    {
        $path = $image->Path ?? '';
        $alt = $image->Alt ?? '';
        $name = $image->Name ?? '';

        \dibi::query('INSERT INTO homeNewsImage (Path, Alt, Name, IdHome) VALUES (%s, %s, %s, %i)', $path, $alt, $name, $homeId);

        return \dibi::getInsertId();
    }
}
