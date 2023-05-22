<?php

namespace kromLand\api\repositories;

use kromLand\api\models\webSettings\WebSettingsModel;

interface IWebSettingsRepository
{
    public function getWebSettings(int $id): WebSettingsModel;
}
