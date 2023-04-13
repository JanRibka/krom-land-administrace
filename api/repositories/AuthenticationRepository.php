<?php
namespace kromLand\api\repositories;

require_once __DIR__ . "/../config/db.php";
require_once __DIR__ . "/./IAuthenticationRepository.php";
require_once __DIR__ . "/../../vendor/autoload.php";
require_once __DIR__ . "/../../vendor/dibi/dibi/src/Dibi/dibi.php";

use Dibi;
use kromLand\api\models\UserModel;
use kromLand\api\repositories\IAuthenticationRepository;

class AuthenticationRepository implements IAuthenticationRepository
{
    public function getUserByUserName(string $userName): UserModel
    {
        $user = dibi::query("SELECT * FROM `login` WHERE UserName = %s", $userName)->fetchSingle();
        
        if (!!!$user) {
            return new UserModel();
        }

        $userModel = new UserModel();
        $userModel->Id = $user->Id;
        $userModel->UserName = $user->UserName;
        $userModel->Password = $user->Password;
        $userModel->LastLogin = $user->LastLogin;
        $userModel->LastLoginAttempt = $user->LastLoginAttempt;
        $userModel->LoginCount = $user->LoginCount;
        $userModel->RefreshToken = $user->RefreshToken;

        return $userModel;
    }

    public function insertUser(UserModel $user): int
    {
        $updateData = $user->GetDataForUpdate($user);
        $updateData["DateCreated"] = date("Y-m-d H:i:s");

        dibi::query("INSERT INTO `login`", $updateData);

        return dibi::getInsertId();
    }

    public function updateUser(UserModel $user): void
    {
        $updateData = $user->GetDataForUpdate($user);
        $id = $user->Id;
    
        dibi::query("UPDATE 'login' as l", $updateData, "WHERE l.Id = %s", $id);
    }
}
?>