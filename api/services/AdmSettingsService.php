<?php

namespace kromLand\api\services;

use kromLand\api\models\admSettings\DropDownsDataModel;
use kromLand\api\models\admSettings\UserEditModel;
use kromLand\api\repositories\IAdmSettingsRepository;
use kromLand\api\repositories\ICommonRepository;

require_once __DIR__.'/./IAdmSettingsService.php';
require_once __DIR__.'/../repositories/IAdmSettingsRepository.php';
require_once __DIR__.'/../models/admSettings/UserEditModel.php';
require_once __DIR__.'/../models/admSettings/DropDownsDataModel.php';

class AdmSettingsService implements IAdmSettingsService
{
    private readonly IAdmSettingsRepository $_admSettingsRepository;
    private readonly ICommonRepository $_commonRepository;

    public function __construct(IAdmSettingsRepository $pAdmSettingsRepository, ICommonRepository $pCommonRepository)
    {
        $this->_admSettingsRepository = $pAdmSettingsRepository;
        $this->_commonRepository = $pCommonRepository;
    }

    public function getUsersByLoggedUseId(string $idLoggedUser): array
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

    public function getUsersForEdit(string $id): UserEditModel
    {
        $id = (int) $id;

        $user = $this->_admSettingsRepository->getUserByUserId($id);

        $roleList = $this->_commonRepository->getTableOfKeyByGroupKey('ROLE_LIST');

        $userEdit = new UserEditModel();
        $userEdit->User = $user;
        $userEdit->DropDownsData = new DropDownsDataModel(
            $roleList
        );

        return $userEdit;
    }
}
