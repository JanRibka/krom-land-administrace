<?php

namespace kromLand\api\models\webSettings;

class WebSettingsModel
{
    public int $Id;
    public string $FacebookLink;
    public string $InstagramLink;
    public string $TikTokLink;

    public function __construct(int $id, string $facebookLink, string $instagramLink, string $tikTokLink)
    {
        $this->Id = $id;
        $this->FacebookLink = $facebookLink;
        $this->InstagramLink = $instagramLink;
        $this->TikTokLink = $tikTokLink;
    }
}
