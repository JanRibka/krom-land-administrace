<?php

namespace kromLand\api\repositories;

use kromLand\api\models\authentication\UserModel;

interface IAuthenticationRepository
{
    public function getUserByUserName(string $userName): UserModel;

    public function getUserByRefreshToken(string $refreshToken): UserModel;

    public function getUserByUserId(int $idUser): UserModel;

    public function insertUser(UserModel $userName): int;

    public function updateUser(UserModel $userName): void;

    public function deleteUser(int $id): void;
}
