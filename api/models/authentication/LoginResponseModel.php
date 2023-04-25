<?php
namespace kromLand\api\models\authentication;

class LoginResponseModel
{
    public int $UserRole = 0;
    public string $AccessToken = "";
    
    public function __construct($userRole, $accessToken) {
        $this->UserRole = $userRole;
        $this->AccessToken = $accessToken;
    }
}
?>