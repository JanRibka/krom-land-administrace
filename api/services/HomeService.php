<?php 
namespace kromLand\api\services;

require_once __DIR__ . "/./IHomeService.php";
require_once __DIR__ . "/../repositories/IHomeRepository.php";

use kromLand\api\models\home\HomeModel;
use kromLand\api\repositories\IHomeRepository;
use kromLand\api\services\IHomeService;

class HomeService implements IHomeService
{
    private readonly IHomeRepository $_homeRepository;

    public function __construct(IHomeRepository $pHomeRepository)
    {
        $this->_homeRepository = $pHomeRepository;
    }

    public function getHome(int $id): HomeModel
    {
        $home = $this->_homeRepository->getHome($id);
        $home->TeamMembers = $this->getTeamMembers();

        return $home;
    }

    public function getTeamMembers(): array
    {
        return $this->_homeRepository->getTeamMembers();
    }
}
?>