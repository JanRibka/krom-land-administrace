<?php

namespace kromLand\api\services;

require_once __DIR__.'/./IAuthenticationService.php';
require_once __DIR__.'/../repositories/IAuthenticationRepository.php';

use kromLand\api\models\authentication\UserModel;
use kromLand\api\repositories\IAuthenticationRepository;

class AuthenticationService implements IAuthenticationService
{
    private readonly IAuthenticationRepository $_authenticationRepository;

    public function __construct(IAuthenticationRepository $pAuthenticationRepository)
    {
        $this->_authenticationRepository = $pAuthenticationRepository;
    }

    public function getDuplicateUser(string $userName): bool
    {
        $user = $this->_authenticationRepository->getUserByUserName($userName);

        return $user->Id !== null;
    }

    public function getUserByUserName(string $userName): UserModel
    {
        return $this->_authenticationRepository->getUserByUserName($userName);
    }

    public function getUserByRefreshToken(string $refreshToken): UserModel
    {
        return $this->_authenticationRepository->getUserByRefreshToken($refreshToken);
    }

    public function getUserByUserId(string $idUser): UserModel
    {
        $id = (int) $idUser;

        return $this->getUserByUserId($id);
    }

    public function insertUser(UserModel $user): int
    {
        return $this->_authenticationRepository->insertUser($user);
    }

    public function updatetUser(UserModel $user): void
    {
        $this->_authenticationRepository->updateUser($user);
    }
}
