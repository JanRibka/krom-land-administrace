<?php

namespace kromLand\api\repositories;

interface IAdmSettingsRepository
{
    public function getUsersByLoggedUseId(int $idLoggedUser) : array;

    public function dropDownsDataUpdate(array $dropDownsData) : void;
}
