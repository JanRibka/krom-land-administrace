<?php

namespace kromLand\api\models\webSettings;

class WebLogosModel
{
    public int $Id;
    public string|null $HeaderLogo;

    public function __construct(int $id, string|null $headerLogo)
    {
        $this->Id = $id;
        $this->HeaderLogo = $headerLogo;
    }
}
