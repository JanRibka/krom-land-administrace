<?php
namespace kromLand\api\repositories;

require_once __DIR__ . "/../config/db.php";
require_once __DIR__ . "/./IAuthenticationRepository.php";
require_once __DIR__ . "/../../vendor/autoload.php";
require_once __DIR__ . "/../../vendor/dibi/dibi/src/Dibi/dibi.php";

use DateTime;
use Dibi;
use kromLand\api\models\authentication\UserModel;
use kromLand\api\repositories\IAuthenticationRepository;

class AuthenticationRepository implements IAuthenticationRepository
{
    public function getUserByUserName(string $userName): UserModel
    {
        $user = dibi::query("SELECT * FROM `login` WHERE UserName = %s", $userName)->fetch();

        if (!!!$user) {
            return new UserModel();
        }

        $userModel = new UserModel();
        $userModel->Id = $user->Id;
        $userModel->IdParent = $user->IdParent;
        $userModel->UserName = $user->UserName;
        $userModel->Password = $user->Password;
        $userModel->DateCreated = $user->DateCreated ? new DateTime($user->DateCreated) : null;
        $userModel->LastLogin = $user->LastLogin ? new DateTime($user->LastLogin) : null;
        $userModel->LastLoginAttempt = $user->LastLogin ? new DateTime($user->LastLogin) : null;
        $userModel->LoginCount = $user->LoginCount;
        $userModel->RefreshToken = $user->RefreshToken;
        $userModel->UserRoleValue = $user->UserRoleValue;

        return $userModel;
    }

    public function getUserByRefreshToken(string $refreshToken): UserModel
    {
        $user = dibi::query("SELECT * FROM `login` WHERE RefreshToken = %s", $refreshToken)->fetch();

        if (!!!$user) {
            return new UserModel();
        }

        $userModel = new UserModel();
        $userModel->Id = $user->Id;
        $userModel->IdParent = $user->IdParent;
        $userModel->UserName = $user->UserName;
        $userModel->Password = $user->Password;
        $userModel->DateCreated = $user->DateCreated ? new DateTime($user->DateCreated) : null;
        $userModel->LastLogin = $user->LastLogin ? new DateTime($user->LastLogin) : null;
        $userModel->LastLoginAttempt = $user->LastLogin ? new DateTime($user->LastLogin) : null;
        $userModel->LoginCount = $user->LoginCount;
        $userModel->RefreshToken = $user->RefreshToken;
        $userModel->UserRoleValue = $user->UserRoleValue;

        return $userModel;
    }

    public function insertUser(UserModel $user): int
    {
        $insertData = $user->GetDataForUpdate($user);
        $insertData["DateCreated"] = date("Y-m-d H:i:s");
        $insertData["LoginCount"] = 0;

        dibi::query("INSERT INTO `login`", $insertData);

        return dibi::getInsertId();
    }

    public function updateUser(UserModel $user): void
    {
        $updateData = $user->GetDataForUpdate($user);
        $id = $user->Id;

        dibi::query(
            "UPDATE `login` as l SET", 
                $updateData, 
            "WHERE l.Id = %i", 
            $id
        );
    }
}
?>