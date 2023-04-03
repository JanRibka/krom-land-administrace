<?php
require_once __DIR__ . "/../../vendor/autoload.php";

// Vývoj
// dibi::connect([
//   "driver" => "mysqli",
//   "host" => "sql5.webzdarma.cz",
//   "username" => "ribkavyvojkv3055",
//   "password" => "9*45253qv4h.MM9Wy8Jq",
//   "database" => "ribkavyvojkv3055",
//   "charset" => "utf8",
// ]);

// Produkce
dibi::connect([
  "driver" => "mysqli",
  "host" => "sql4.webzdarma.cz",
  "username" => "kromlandcz6333",
  "password" => ",yxi30nUd4-@vwrz)(3Q",
  "database" => "kromlandcz6333",
  "charset" => "utf8",
]);
?>
