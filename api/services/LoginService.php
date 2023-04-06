<?php 
namespace kromLand\api\services;

use kromLand\api\models\UserModel;
use kromLand\api\repositories\ILoginRepository;

class LoginService implements ILoginService
{
    private readonly ILoginRepository $_loginRepository;

    public function __construct(ILoginRepository $pLoginRepository)
    {
        $this->_loginRepository = $pLoginRepository;
    }

    public function getDuplicateUser(string $userName): bool 
    {
        $user = $this->_loginRepository->getUserByUserName($userName);
        return !empty($user);
    }

    public function getUserByUserName(string $userName): UserModel
    {
        return $this->_loginRepository->getUserByUserName($userName);
    }

    public function insertUser(UserModel $user): int
    {
        return $this->_loginRepository->insertUser($user);
    }

    public function updatetUser(UserModel $user): void
    {
        $this->_loginRepository->updateUser($user);
    }
}
?>