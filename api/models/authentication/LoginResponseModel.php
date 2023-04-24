<?php
namespace kromLand\api\models\authentication;

class LoginResponseModel
{
    public string $UserRole = "";
    public string $AccessToken = "";
    
    public function __construct($userRole, $accessToken) {
        $this->UserRole = $userRole;
        $this->AccessToken = $accessToken;
    }
}
?>