<?php

namespace kromLand\api\models\authentication;

class RefreshTokenResponseModel
{
    public int $UserRole = 0;
    public string $AccessToken = '';
    public string $UserName = '';

    public function __construct(int $userRole, string $accessToken, string $userName)
    {
        $this->UserRole = $userRole;
        $this->AccessToken = $accessToken;
        $this->UserName = $userName;
    }
}
