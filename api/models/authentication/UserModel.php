<?php
namespace kromLand\api\models\authentication;

use DateTime;

class UserModel
{
    public ?int $Id = null;
    public ?int $IdParent = null;
    public ?string $UserName = null;
    public ?string $Password = null;
    public ?DateTime $DateCreated = null;
    public ?DateTime $LastLogin = null;
    public ?DateTime $LastLoginAttempt = null;
    public ?int $LoginCount = null;
    public ?string $RefreshToken = null;
    public ?int $UserRoleValue = null;

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