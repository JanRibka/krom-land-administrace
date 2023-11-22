<?php

namespace kromLand\api\services;

use kromLand\api\models\admSettings\UserEditModel;
use kromLand\api\models\admSettings\AdmSettingsModel;

interface IAdmSettingsService
{
    public function getAdmSettings() : AdmSettingsModel;

    public function getDropDownsData() : array;

    public function dropDownsDataUpdate(string $dropDownsData) : void;

    public function getRoleList() : array;

    public function getUsersByLoggedUseId(string $idLoggedUser) : array;

    public function getUsersForEdit(string $id) : UserEditModel;

    public function userUpdate(string $userEncoded, string $idLoggedUser) : void;

    public function userDelete(string $id, string $idLoggedUser) : void;
}
