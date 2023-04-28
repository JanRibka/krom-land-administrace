<?php
namespace kromLand\api\repositories;

use kromLand\api\models\authentication\UserModel;

interface IHomeDataRepository
{
    public function getUserByUserName(string $userName): UserModel;
    public function getUserByRefreshToken(string $refreshToken): UserModel;
    public function insertUser(UserModel $userName): int;
    public function updateUser(UserModel $userName): void;
}
?>