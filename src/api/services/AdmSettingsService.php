<?php

namespace kromLand\api\services;

use kromLand\api\models\common\TableOfKeysModel;
use kromLand\api\repositories\ICommonRepository;
use kromLand\api\models\authentication\UserModel;
use kromLand\api\models\admSettings\UserEditModel;
use kromLand\api\models\admSettings\AdmSettingsModel;
use kromLand\api\repositories\IAdmSettingsRepository;
use kromLand\api\repositories\IAuthenticationRepository;

require_once __DIR__ . '/./IAdmSettingsService.php';
require_once __DIR__ . '/../repositories/IAdmSettingsRepository.php';
require_once __DIR__ . '/../models/admSettings/AdmSettingsModel.php';
require_once __DIR__ . '/../models/admSettings/UserEditModel.php';
require_once __DIR__ . '/../models/admSettings/DropDownsDataModel.php';
require_once __DIR__ . '/../models/common/TableOfKeysModel.php';

class AdmSettingsService implements IAdmSettingsService
{
    private readonly IAdmSettingsRepository $_admSettingsRepository;
    private readonly ICommonRepository $_commonRepository;
    private readonly IAuthenticationRepository $_authenticationRepository;

    public function __construct(
        IAdmSettingsRepository $pAdmSettingsRepository,
        ICommonRepository $pCommonRepository,
        IAuthenticationRepository $pAuthenticationRepository)
    {
        $this->_admSettingsRepository = $pAdmSettingsRepository;
        $this->_commonRepository = $pCommonRepository;
        $this->_authenticationRepository = $pAuthenticationRepository;
    }

    public function getAdmSettings() : AdmSettingsModel
    {
        $dropDownData = $this->_commonRepository->getDropDownsData();

        $admSettings = new AdmSettingsModel();
        $admSettings->DropDownsData = $dropDownData;

        return $admSettings;
    }

    public function getDropDownsData() : array
    {
        return $this->_commonRepository->getDropDownsData();
    }

    public function dropDownsDataUpdate(string $dropDownsData) : void
    {
        $dropDownsDataEncoded = json_decode($dropDownsData);
        $dropDownsDataModel = [];

        foreach ($dropDownsDataEncoded as $item) {
            array_push(
                $dropDownsDataModel,
                new TableOfKeysModel(
                    $item->Id,
                    $item->GroupKey,
                    $item->Key,
                    $item->Value,
                    $item->Name,
                    $item->Enabled)
            );
        }

        $this->_admSettingsRepository->dropDownsDataUpdate($dropDownsDataModel);
    }

    public function getRoleList() : array
    {
        return $this->_commonRepository->getTableOfKeyByGroupKey('ROLE_LIST');
    }

    public function getUsersByLoggedUseId(string $idLoggedUser) : array
    {
        $id = (int) $idLoggedUser;

        $roleList = $this->_commonRepository->getTableOfKeyByGroupKey('ROLE_LIST');

        $users = $this->_admSettingsRepository->getUsersByLoggedUseId($id);

        $result = array_map(function ($item) use ($roleList) {
            $userRoleName = array_reduce($roleList, function ($result, $keyItem) use ($item) {
                if ($keyItem->Value === $item->UserRoleValue) {
                    return $keyItem->Name;
                }

                return $result;
            }, '');

            $item->UserRoleName = $userRoleName;

            return $item;
        }, $users);

        return $result;
    }

    public function getUsersForEdit(string $id) : UserEditModel
    {
        $id = (int) $id;

        $user = $this->_authenticationRepository->getUserByUserId($id);

        $userEdit = new UserEditModel();
        $userEdit->User = $user;

        return $userEdit;
    }

    public function userUpdate(string $userEncoded, string $idLoggedUser) : void
    {
        $idLoggedUser = (int) $idLoggedUser;
        $userDecoded = json_decode($userEncoded);
        $user = new UserModel();

        $user->Id = $userDecoded->Id;
        $user->UserName = $userDecoded->UserName;

        if ($user->Id !== $idLoggedUser) {
            $user->UserRoleValue = $userDecoded->UserRoleValue;
        }

        $this->_authenticationRepository->updateUser($user);
    }

    public function userDelete(string $id, string $idLoggedUser) : void
    {
        $newId = (int) $id;
        $newIdLoggedUser = (int) $idLoggedUser;

        if ($newId !== $newIdLoggedUser) {
            $this->_authenticationRepository->deleteUser($newId);
        }
    }
}
