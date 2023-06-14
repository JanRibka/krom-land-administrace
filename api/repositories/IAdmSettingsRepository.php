<?php

namespace kromLand\api\repositories;

interface IAdmSettingsRepository
{
    public function getUsersByLoggedUseId(int $idLoggedUser): array;
}
