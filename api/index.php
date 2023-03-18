<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");
require __DIR__ . "/core.php";
require __DIR__ . "/webContent/webContent.php";
require __DIR__ . "/image/image.php";

// $allowed_methods = ["send", "getall"];
$action = $_GET["action"];
$type = $_GET["type"];

if (!isset($action)) {
  apiResponse(false, "Metoda '" . $action . "' není specifikovaná");
  die();
}

// if (!in_array($type, $allowed_methods)) {
//   apiResponse(false, "Metoda '" . $type . "' není povolena");
//   die();
// }

if (!isset($type)) {
  apiResponse(false, "Akce '" . $type . "' buď chybí, nebo není povolena");
  die();
}

try {
  call_user_func(camelcase($action) . "::" . $type);
  // call_user_func([$action, $type]);
} catch (Exception $ex) {
  apiResponse(
    false,
    "Metoda '" . camelcase($action) . "::" . $type . "' neexistuje"
  );
  die();
}
?>
