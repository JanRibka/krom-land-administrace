<?php

namespace kromLand\api\repositories;

use kromLand\api\enums\UserRoleEnum;
use kromLand\api\models\authentication\UserModel;

require_once __DIR__.'/../config/db.php';
require_once __DIR__.'/./IAdmSettingsRepository.php';
require_once __DIR__.'/../../vendor/autoload.php';
require_once __DIR__.'/../../vendor/dibi/dibi/src/Dibi/dibi.php';
require_once __DIR__.'/./../models/authentication/UserModel.php';

class AdmSettingsRepository implements IAdmSettingsRepository
{
    public function getUsersByLoggedUseId(int $idLoggedUser): array
    {
        $result = [];

        $loggedUser = \dibi::select('*')
            ->from('login')
            ->as('l')
            ->where('l.Id = %i', $idLoggedUser)
            ->fetch();

        if (!(bool) $loggedUser) {
            return $result;
        }

        $user = new UserModel();
        $user->Id = $loggedUser->Id;
        $user->IdParent = $loggedUser->IdParent;
        $user->UserName = $loggedUser->UserName;
        $user->DateCreated = $loggedUser->DateCreated ? new \DateTime($loggedUser->DateCreated) : null;
        $user->LastLogin = $loggedUser->LastLogin ? new \DateTime($loggedUser->LastLogin) : null;
        $user->LastLoginAttempt = $loggedUser->LastLoginAttempt ? new \DateTime($loggedUser->LastLoginAttempt) : null;
        $user->LoginCount = $loggedUser->LoginCount;
        $user->LoginAttemptCount = $loggedUser->LoginAttemptCount;
        $user->UserRoleValue = $loggedUser->UserRoleValue;

        array_push($result, $user);

        if ($user->UserRoleValue === UserRoleEnum::ADMIN) {
            $childUsers = \dibi::select('*')
                ->from('login')
                ->as('l')
                ->where('l.IdParent = %i', $loggedUser->IdParent ?? $idLoggedUser)
                ->fetchAll();

            foreach ($childUsers as $childUser) {
                $user = new UserModel();
                $user->Id = $childUser->Id;
                $user->IdParent = $childUser->IdParent;
                $user->UserName = $childUser->UserName;
                $user->Password = $childUser->Password;
                $user->DateCreated = (bool) $childUser->DateCreated ? new \DateTime($childUser->DateCreated) : null;
                $user->LastLogin = (bool) $childUser->LastLogin ? new \DateTime($childUser->LastLogin) : null;
                $user->LastLoginAttempt = (bool) $childUser->LastLoginAttempt ? new \DateTime($childUser->LastLoginAttempt) : null;
                $user->LoginCount = $childUser->LoginCount;
                $user->LoginAttemptCount = $childUser->LoginAttemptCount;
                $user->UserRoleValue = $loggedUser->UserRoleValue;

                array_push($result, $user);
            }
        }

        return $result;
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
}
