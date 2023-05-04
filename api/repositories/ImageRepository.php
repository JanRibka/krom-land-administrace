<?php

namespace kromLand\api\repositories;

require_once __DIR__.'/../config/db.php';
require_once __DIR__.'/./IImageRepository.php';

class ImageRepository implements IImageRepository
{
    // public function imageDelete(int $id): void
    // {
    //     \dibi::query('DELETE FROM teamMembers as tm WHERE tm.Id = %i', $id);
    // }

    // public function imageInsert(string $image, string $name, string $description): int
    // {
    //     $arr = [
    //         'Image' => $image,
    //         'Name' => $name,
    //         'Description' => $description,
    //       ];

    //     \dibi::query('INSERT INTO teamMembers', $arr);

    //     $id = \dibi::getInsertId();

    //     return $id;
    // }

    // public function imageUpdate(string $name, string $description, int $id): void
    // {
    //     $arr = [
    //         'Name' => $name,
    //         'Description' => $description,
    //       ];

    //     \dibi::query(
    //         'UPDATE teamMembers as tm SET',
    //         $arr,
    //         'WHERE tm.Id = %i',
    //         $id
    //     );
    // }
}
