<?php
namespace kromLand\api\repositories;

use kromLand\api\models\home\HomeModel;

interface IHomeRepository
{
    public function getHome(int $id): HomeModel;
    public function getTeamMembers(): array;
}
?>