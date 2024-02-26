<?php
define("APP_ENV", "LOCAL"); # LOCAL / TEST / PROD

// Připojení k db
$dbHost = [
    "LOCAL" => "localhost",
    "TEST" => "sql5.webzdarma.cz",
    "PROD" => "sql4.webzdarma.cz"
];

$dbUserName = [
    "LOCAL" => "phpmyadmin",
    "TEST" => "ribkavyvojkv3055",
    "PROD" => "kromlandcz6333"
];

$dbPassword = [
    "LOCAL" => "password",
    "TEST" => "9*45253qv4h.MM9Wy8Jq",
    "PROD" => ",yxi30nUd4-@vwrz)(3Q"
];

$dbDatabase = [
    "LOCAL" => "kromlandcz6333",
    "TEST" => "ribkavyvojkv3055",
    "PROD" => "kromlandcz6333"
];

// Autorizační tokeny
#Tokeny získám tak, že v terminálu napíšu node a potom spustím příkaz require('crypto').randomBytes(64).toString("hex")
$accessTokenSecret = [
    "LOCAL" => "",
    "TEST" => "8c92cfbfbe3b52b0109f23114ad3b16ce3d3fca4f408b78f6d3273ea75b03a91b81a9ee1e60a342ff5ad26de3af159d2c71dbbb1a81d5dba8bed9f379a900172",
    "PROD" => "8c92cfbfbe3b52b0109f23114ad3b16ce3d3fca4f408b78f6d3273ea75b03a91b81a9ee1e60a342ff5ad26de3af159d2c71dbbb1a81d5dba8bed9f379a900172"
];

$refreshTokenSecret = [
    "LOCAL" => "",
    "TEST" => "3e077da317b4d83bbc0ec910bb56c07188911339f60999fcb0ccc5c697097d2f0d5f3fa077a259f11aea34200362c1ac7a64f6f85154a78ce7264b769750fca7",
    "PROD" => "3e077da317b4d83bbc0ec910bb56c07188911339f60999fcb0ccc5c697097d2f0d5f3fa077a259f11aea34200362c1ac7a64f6f85154a78ce7264b769750fca7"
];
?>