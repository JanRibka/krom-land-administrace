<?php

namespace kromLand\api\services;

use kromLand\api\models\webSettings\WebSettingsModel;
use kromLand\api\repositories\IWebSettingsRepository;
use kromLand\api\repositories\IWebSettingsService;

require_once __DIR__.'/./IWebSettingsService.php';
require_once __DIR__.'/../models/webSettings/WebSettingsModel.php';

class WebSettingsService implements IWebSettingsService
{
    private readonly IWebSettingsRepository $_webSettingsRepository;

    public function __construct(IWebSettingsRepository $pWebSettingsRepository)
    {
        $this->_webSettingsRepository = $pWebSettingsRepository;
    }

    public function getWebSettings(int $id): WebSettingsModel
    {
        return $this->_webSettingsRepository->getWebSettings($id);
    }
}
