<?php
namespace kromLand\api\models;

class UserModel
{
    public $Id;
    public $UserName;
    public $Password;
    public $LastLogin;
    public $LastLoginAttempt;
    public $LoginCount;
    public $RefreshToken;

    public function GetDataForUpdate(UserModel $user): array
    {
        $result = [];
        $data = get_object_vars($user);
        $keys = array_keys($data);

        foreach ($keys as $key) {
            if ($key !== "Id") {
                if (isset($data[$key])) {
                    $result[$key] = $data[$key];
                }
            }
        }

        return $result;
    }
}
?>