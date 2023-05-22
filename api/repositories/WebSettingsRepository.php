<?php

namespace kromLand\api\repositories;

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
        );

        return $webSettingsModel;
    }
}
