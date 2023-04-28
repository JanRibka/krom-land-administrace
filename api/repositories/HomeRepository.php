<?php
namespace kromLand\api\repositories;

require_once __DIR__ . "/../config/db.php";
require_once __DIR__ . "/./IHomeRepository.php";
require_once __DIR__ . "/../../vendor/autoload.php";
require_once __DIR__ . "/../../vendor/dibi/dibi/src/Dibi/dibi.php";
require_once __DIR__ . "/../models/home/TeamMemberModel.php";
require_once __DIR__ . "/../models/home/HomeModel.php";

use Dibi;
use kromLand\api\models\home\HomeModel;
use kromLand\api\models\home\TeamMemberModel;
use kromLand\api\repositories\IHomeRepository;

class HomeRepository implements IHomeRepository
{
    public function getHome(int $id): HomeModel
    {
        $home = dibi::query(
            "SELECT * FROM home as h WHERE h.Id = %i",
            $id
        )->fetch();

        $homeModel = new HomeModel(
            $home->Id,
            $home->Title,
            $home->Description,
            $home->PageHeaderTextMain,
            $home->PageHeaderTextMainColor,
            $home->PageHeaderTextSecondary,
            $home->PageHeaderTextSecondaryColor,
            $home->MainImage,
            $home->AboutUs,
            $home->AboutUsImage,
            $home->PeopleSay1Text,
            $home->PeopleSay1Name,
            $home->PeopleSay2Text,
            $home->PeopleSay2Name,
            $home->PeopleSay3Text,
            $home->PeopleSay3Name,
            []
          );

        return $homeModel;
    }

    public function getTeamMembers(): array 
    {
        $result = array( new TeamMemberModel());
        $teamMembers = dibi::query("SELECT * FROM teamMembers as tm")->fetchAll();

        foreach ($teamMembers as $member) {
            $newMember = new TeamMemberModel(
                $member->Id,
                $member->Image,
                $member->Name,
                $member->Descritption,
            );

            array_push($result, $newMember);
        }

        return $result;
    }
}
?>
