<?php

namespace kromLand\api\repositories;

require_once __DIR__.'/../config/db.php';
require_once __DIR__.'/./IAuthenticationRepository.php';
require_once __DIR__.'/../../vendor/autoload.php';
require_once __DIR__.'/../../vendor/dibi/dibi/src/Dibi/dibi.php';

use kromLand\api\models\authentication\UserModel;

class AuthenticationRepository implements IAuthenticationRepository
{
    public function getUserByUserName(string $userName): UserModel
    {
        $user = \dibi::query('SELECT * FROM `login` WHERE UserName = %s', $userName)->fetch();

        if (!(bool) $user) {
            return new UserModel();
        }

        $userModel = new UserModel();
        $userModel->Id = $user->Id;
        $userModel->IdParent = $user->IdParent;
        $userModel->UserName = $user->UserName;
        $userModel->Password = $user->Password;
        $userModel->DateCreated = $user->DateCreated ? new \DateTime($user->DateCreated) : null;
        $userModel->LastLogin = $user->LastLogin ? new \DateTime($user->LastLogin) : null;
        $userModel->LastLoginAttempt = $user->LastLogin ? new \DateTime($user->LastLogin) : null;
        $userModel->LoginCount = $user->LoginCount;
        $userModel->LoginAttemptCount = $user->LoginAttemptCount;
        $userModel->RefreshToken = $user->RefreshToken;
        $userModel->UserRoleValue = $user->UserRoleValue;

        return $userModel;
    }

    public function getUserByRefreshToken(string $refreshToken): UserModel
    {
        $user = \dibi::query('SELECT * FROM `login` WHERE RefreshToken = %s', $refreshToken)->fetch();

        if (!(bool) $user) {
            return new UserModel();
        }

        $userModel = new UserModel();
        $userModel->Id = $user->Id;
        $userModel->IdParent = $user->IdParent;
        $userModel->UserName = $user->UserName;
        $userModel->Password = $user->Password;
        $userModel->DateCreated = $user->DateCreated ? new \DateTime($user->DateCreated) : null;
        $userModel->LastLogin = $user->LastLogin ? new \DateTime($user->LastLogin) : null;
        $userModel->LastLoginAttempt = $user->LastLogin ? new \DateTime($user->LastLogin) : null;
        $userModel->LoginCount = $user->LoginCount;
        $userModel->LoginAttemptCount = $user->LoginAttemptCount;
        $userModel->RefreshToken = $user->RefreshToken;
        $userModel->UserRoleValue = $user->UserRoleValue;

        return $userModel;
    }

    public function getUserByUserId(int $idUser): UserModel
    {
        $selectedUser = \dibi::select('*')
        ->from('login')
        ->as('l')
        ->where('l.Id = %i', $idUser)
        ->fetch();

        if (!(bool) $selectedUser) {
            return new UserModel();
        }

        $user = new UserModel();
        $user->Id = $selectedUser->Id;
        $user->IdParent = $selectedUser->IdParent;
        $user->UserName = $selectedUser->UserName;
        $user->DateCreated = (bool) $selectedUser->DateCreated ? new \DateTime($selectedUser->DateCreated) : null;
        $user->LastLogin = (bool) $selectedUser->LastLogin ? new \DateTime($selectedUser->LastLogin) : null;
        $user->LastLoginAttempt = (bool) $selectedUser->LastLoginAttempt ? new \DateTime($selectedUser->LastLoginAttempt) : null;
        $user->LoginCount = $selectedUser->LoginCount;
        $user->LoginAttemptCount = $selectedUser->LoginAttemptCount;
        $user->UserRoleValue = $selectedUser->UserRoleValue;

        return $user;
    }

    public function insertUser(UserModel $user): int
    {
        $insertData = $user->GetDataForUpdate($user);
        $insertData['DateCreated'] = date('Y-m-d H:i:s');

        \dibi::query('INSERT INTO `login`', $insertData);

        return \dibi::getInsertId();
    }

    public function updateUser(UserModel $user): void
    {
        $updateData = $user->GetDataForUpdate($user);
        $id = $user->Id;

        \dibi::query(
            'UPDATE `login` as l SET',
            $updateData,
            'WHERE l.Id = %i',
            $id
        );
    }
}
