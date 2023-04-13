<?php

namespace kromLand\api\repositories;

require_once __DIR__ . "/../config/db.php";

use kromLand\api\models\UserModel;

interface IAuthenticationRepository
{
    public function getUserByUserName(string $userName): UserModel;
    public function insertUser(UserModel $userName): int;
    public function updateUser(UserModel $userName): void;
}
?>