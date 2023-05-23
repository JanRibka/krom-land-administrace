<?php

namespace kromLand\api\repositories;

use kromLand\api\models\webSettings\WebLogosModel;
use kromLand\api\models\webSettings\WebSettingsModel;

interface IWebSettingsService
{
    public function getWebSettings(int $id): WebSettingsModel;

    public function webSettingsUpdate(string $webSettingsJson): void;

    public function getWebLogos(int $id): WebLogosModel;
}
