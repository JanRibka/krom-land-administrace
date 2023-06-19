<?php

namespace kromLand\api\services;

use kromLand\api\models\admSettings\AdmSettingsModel;
use kromLand\api\models\admSettings\UserEditModel;

interface IAdmSettingsService
{
    public function getAdmSettings(): AdmSettingsModel;

    public function getUsersByLoggedUseId(string $idLoggedUser): array;

    public function getUsersForEdit(string $id): UserEditModel;

    public function userUpdate(string $userEncoded, string $idLoggedUser): void;

    public function userDelete(string $id, string $idLoggedUser): void;
}
