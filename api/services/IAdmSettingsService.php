<?php

namespace kromLand\api\services;

interface IAdmSettingsService
{
    public function getUsersByLoggedUseId(string $idLoggedUser): array;
}
