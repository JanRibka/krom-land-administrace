<?php

namespace kromLand\api\services;

use kromLand\api\repositories\IAdmSettingsRepository;

require_once __DIR__.'/./IAdmSettingsService.php';
require_once __DIR__.'/../repositories/IAdmSettingsRepository.php';

class AdmSettingsService implements IAdmSettingsService
{
    private readonly IAdmSettingsRepository $_admSettingsRepository;

    public function __construct(IAdmSettingsRepository $pAdmSettingsRepository)
    {
        $this->_admSettingsRepository = $pAdmSettingsRepository;
    }

    public function getUsersByLoggedUseId(string $idLoggedUser): array
    {
        $id = (int) $idLoggedUser;

        return $this->_admSettingsRepository->getUsersByLoggedUseId($id);
    }
}
