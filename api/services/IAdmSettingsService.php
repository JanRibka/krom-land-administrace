<?php

namespace kromLand\api\services;

use kromLand\api\models\admSettings\UserEditModel;

interface IAdmSettingsService
{
    public function getUsersByLoggedUseId(string $idLoggedUser): array;

    public function getUsersForEdit(string $id): UserEditModel;
}
