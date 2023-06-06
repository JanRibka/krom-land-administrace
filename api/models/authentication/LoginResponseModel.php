<?php

namespace kromLand\api\models\authentication;

class LoginResponseModel
{
    public int $UserRole = 0;
    public string $AccessToken = '';
    public int $UserId = 0;

    public function __construct(int $userRole, string $accessToken, int $userId)
    {
        $this->UserRole = $userRole;
        $this->AccessToken = $accessToken;
        $this->UserId = $userId;
    }
}
