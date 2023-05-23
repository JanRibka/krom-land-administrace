<?php

namespace kromLand\api\repositories;

use kromLand\api\models\webSettings\WebLogosModel;
use kromLand\api\models\webSettings\WebSettingsModel;

require_once __DIR__.'/../config/db.php';
require_once __DIR__.'/./IWebSettingsRepository.php';

class WebSettingsRepository implements IWebSettingsRepository
{
    public function getWebSettings(int $id): WebSettingsModel
    {
        $webSettings = \dibi::select('*')
        ->from('webSettings')
        ->as('ws')
        ->where('ws.Id = %i', $id)
        ->fetch();

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

        return $webSettingsModel;
    }

    public function webSettingsUpdate(WebSettingsModel $webSettings): void
    {
        $arr = [
            'FacebookLink' => $webSettings->FacebookLink,
            'InstagramLink' => $webSettings->InstagramLink,
            'TikTokLink' => $webSettings->TikTokLink,
            'SubjectName' => $webSettings->SubjectName,
            'SubjectICO' => $webSettings->SubjectICO,
            'SubjectDIC' => $webSettings->SubjectDIC,
            'AddressName' => $webSettings->AddressName,
            'AddressAddress' => $webSettings->AddressAddress,
            'AddressLink' => $webSettings->AddressLink,
            'ContactName' => $webSettings->ContactName,
            'ContactHours' => $webSettings->ContactHours,
            'ContactTel' => $webSettings->ContactTel,
            'ContactEmail' => $webSettings->ContactEmail,
        ];

        \dibi::update('webSettings', $arr)
            ->where('Id = %i', $webSettings->Id)
            ->execute();
    }

    public function getWebLogos(int $id): WebLogosModel
    {
        $webLogos = \dibi::select('*')
        ->from('webLogos')
        ->as('wl')
        ->where('wl.Id = %i', $id)
        ->fetch();

        $webLogosModel = new WebLogosModel(
            $webLogos->Id,
            $webLogos->HeaderLogo,
        );

        return $webLogosModel;
    }
}
