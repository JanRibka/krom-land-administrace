<?php
namespace kromLand\api\services;

use kromLand\api\models\home\HomeModel;

interface IHomeService
{
    public function getHome(int $id): HomeModel;
    public function getTeamMembers(): array;
}
?>