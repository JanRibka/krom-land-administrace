<?php

namespace kromLand\api\repositories;

require_once __DIR__ . "/../config/db.php";

use Dibi;
use kromLand\api\models\UserModel;

interface ILoginRepository
{
    public function getUserByUserName(string $userName): UserModel;
    public function insertUser(UserModel $userName): int;
    public function updateUser(UserModel $userName): void;
}
?>