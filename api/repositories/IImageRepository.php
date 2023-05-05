<?php

namespace kromLand\api\repositories;

interface IImageRepository
{
    public function imageInsert(string $image, string $imageName, string $description): int;

    public function imageUpdate(string $name, string $description, int $id): void;

    public function imageSaveHome(string $image, string $imageName, int $homeId): void;
}
