<?php
namespace kromLand\api\config;

require_once __DIR__ . "/../../vendor/autoload.php";

use Dibi;
use Dotenv\Dotenv;
use Exception;

$dotEnv = Dotenv::createImmutable(__DIR__ . "/../");
$dotEnv->load();

$appEnv = getenv("APP_ENV");

if ($appEnv === "local") {
  $dotEnv = Dotenv::createImmutable(__DIR__ . "/../.env.local");
} else if (getenv("APP_ENV") === "test") {
  $dotEnv = Dotenv::createImmutable(__DIR__ . "/../.env.test");
} else if (getenv("APP_ENV") === "production") {
  $dotEnv = Dotenv::createImmutable(__DIR__ . "/../.env.production");
} else {
  throw new Exception("APP_ENV not set or invalid value");
}

$dotenv->load();

$dbHost = $_ENV["DB_HOST"];
$dbUsername = $_ENV["DB_USER_NAME"];
$dbPassword = $_ENV["DB_PASSWORD"];
$dbDatabase = $_ENV["DB_DATABASE"];

dibi::connect([
  "driver" => "mysqli",
  "host" => $dbHost,
  "username" => $dbUserName,
  "password" => $dbPassword,
  "database" => $dbDatabase,
  "charset" => "utf8",
]);
?>
