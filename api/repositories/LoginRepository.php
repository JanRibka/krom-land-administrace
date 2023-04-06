<?php
use kromLand\api\models\UserModel;
use kromLand\api\repositories\ILoginRepository;

class LoginRepository implements ILoginRepository
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