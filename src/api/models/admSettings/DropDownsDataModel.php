<?php

namespace kromLand\api\models\admSettings;

class DropDownsDataModel
{
    public array $RoleListData;

    public function __construct(array $roleListData)
    {
        $this->RoleListData = $roleListData;
    }
}
