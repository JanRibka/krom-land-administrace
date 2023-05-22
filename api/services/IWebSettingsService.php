<?php

namespace kromLand\api\repositories;

use kromLand\api\models\webSettings\WebSettingsModel;

interface IWebSettingsService
{
    public function getWebSettings(int $id): WebSettingsModel;
}
