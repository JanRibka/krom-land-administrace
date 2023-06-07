<?php

namespace kromLand\api\repositories;

use kromLand\api\models\authentication\UserModel;

interface IAdmSettingsRepository
{
    public function getUsersByLoggedUseId(int $idLoggedUser): array;

    public function getUserByUserId(int $idUser): UserModel;
}
