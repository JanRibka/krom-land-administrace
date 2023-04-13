<?php
namespace kromLand\api\config;

require_once __DIR__ . "/../../vendor/autoload.php";
require_once __DIR__ . "/../constants/global.php";
require_once __DIR__ . "/../../vendor/dibi/dibi/src/Dibi/dibi.php";

use Dibi;

dibi::connect([
  "driver" => "mysqli",
  "host" => $dbHost[APP_ENV],
  "username" => $dbUserName[APP_ENV],
  "password" => $dbPassword[APP_ENV],
  "database" => $dbDatabase[APP_ENV],
  "charset" => "utf8",
]);
?>
