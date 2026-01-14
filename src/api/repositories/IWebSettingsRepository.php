<?php

namespace kromLand\api\repositories;

use kromLand\api\models\webSettings\WebLogosModel;
use kromLand\api\models\webSettings\WebSettingsModel;

interface IWebSettingsRepository
{
    public function getWebSettings(int $id): WebSettingsModel;

    public function webSettingsUpdate(WebSettingsModel $webSettings): void;

    public function getWebLogos(int $id): WebLogosModel;
}
