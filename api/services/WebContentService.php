<?php 
namespace kromLand\api\services;

require_once __DIR__ . "/./IWebContentService.php";

use kromLand\api\models\webContent\home\HomeModel;
use kromLand\api\repositories\IWebContentRepository;
use kromLand\api\services\IWebContentService;

class WebContentService implements IWebContentService
{
    private readonly IWebContentRepository $_webContentRepository;

    public function __construct(IWebContentRepository $pWebContentRepository)
    {
        $this->_webContentRepository = $pWebContentRepository;
    }

    public function getHome(int $id): HomeModel
    {
        $home = $this->_webContentRepository->getHome($id);
        $home->TeamMembers = $this->getTeamMembers();

        return $home;
    }

    public function getTeamMembers(): array
    {
        return $this->_webContentRepository->getTeamMembers();
    }
}
?>