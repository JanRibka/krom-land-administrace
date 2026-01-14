<?php

namespace kromLand\api\models\authentication;

class RefreshTokenResponseModel
{
    public int $UserRole = 0;
    public string $AccessToken = '';
    public string $UserName = '';
    public int $UserId = 0;

    public function __construct(int $userRole, string $accessToken, string $userName, int $userId)
    {
        $this->UserRole = $userRole;
        $this->AccessToken = $accessToken;
        $this->UserName = $userName;
        $this->UserId = $userId;
    }
}
