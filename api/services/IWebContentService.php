<?php
namespace kromLand\api\services;

use kromLand\api\models\webContent\home\HomeModel;

interface IWebContentService
{
    public function getHome(int $id): HomeModel;
    public function getTeamMembers(): array;
}
?>