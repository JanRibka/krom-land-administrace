<?php

namespace kromLand\api\services;

use kromLand\api\models\webSettings\WebLogosModel;
use kromLand\api\models\webSettings\WebSettingsModel;
use kromLand\api\repositories\IWebSettingsRepository;
use kromLand\api\repositories\IWebSettingsService;

require_once __DIR__.'/./IWebSettingsService.php';
require_once __DIR__.'/../models/webSettings/WebSettingsModel.php';
require_once __DIR__.'/../models/webSettings/WebLogosModel.php';

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

    public function webSettingsUpdate(string $webSettingsJson): void
    {
        $webSettings = json_decode($webSettingsJson);

        $webSettingsModel = new WebSettingsModel(
            $webSettings->Id,
            $webSettings->FacebookLink,
            $webSettings->InstagramLink,
            $webSettings->TikTokLink,
            $webSettings->SubjectName,
            $webSettings->SubjectICO,
            $webSettings->SubjectDIC,
            $webSettings->AddressName,
            $webSettings->AddressAddress,
            $webSettings->AddressLink,
            $webSettings->ContactName,
            $webSettings->ContactHours,
            $webSettings->ContactTel,
            $webSettings->ContactEmail,
        );

        $this->_webSettingsRepository->webSettingsUpdate($webSettingsModel);
    }

    public function getWebLogos(int $id): WebLogosModel
    {
        return $this->_webSettingsRepository->getWebLogos($id);
    }
}
