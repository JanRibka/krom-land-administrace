<?php
namespace kromLand\api\services;

use kromLand\api\models\UserModel;

interface IAuthenticationService
{
    public function getDuplicateUser(string $userName): bool;
    public function getUserByUserName(string $userName): UserModel;
    public function insertUser(UserModel $user): int;
    public function updatetUser(UserModel $user): void; 
}
?>