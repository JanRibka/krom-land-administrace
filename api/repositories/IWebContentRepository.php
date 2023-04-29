<?php
namespace kromLand\api\repositories;

use kromLand\api\models\webContent\home\HomeModel;

interface IWebContentRepository
{
    public function getHome(int $id): HomeModel;
    public function getTeamMembers(): array;
}
?>