<?php
define("APP_ENV", "TEST"); # LOCAL / TEST / PROD

// Připojení k db
$dbHost = [
    "LOCAL" => "db",
    "TEST" => "sql5.webzdarma.cz",
    "PROD" => "sql4.webzdarma.cz"
];

$dbUserName = [
    "LOCAL" => "kromuser",
    "TEST" => "ribkavyvojkv3055",
    "PROD" => "kromlandcz6333"
];

$dbPassword = [
    "LOCAL" => "krompassword",
    "TEST" => "9*45253qv4h.MM9Wy8Jq",
    "PROD" => ",yxi30nUd4-@vwrz)(3Q"
];

$dbDatabase = [
    "LOCAL" => "kromland",
    "TEST" => "ribkavyvojkv3055",
    "PROD" => "kromlandcz6333"
];

// Autorizační tokeny
#Tokeny získám tak, že v terminálu napíšu node a potom spustím příkaz require('crypto').randomBytes(64).toString("hex")
$accessTokenSecret = [
    "LOCAL" => "d8e8fca2dc0f896fd7cb4cb0031ba24982a5dcb9a1b6238b776269176395b0f47e33e9b1d6bd484199f57917290f331c0e2a2c16a695b770512f458129762886",
    "TEST" => "52a3a5f9198a0efb5277df1809b9fab2f81e6fbf6c3013c84a1625d6db6155bccbd8faef70fb0b5f2ca45a7c36d4154d268594d73b83df87c9d59dd7c8d6b8f9",
    "PROD" => "8c92cfbfbe3b52b0109f23114ad3b16ce3d3fca4f408b78f6d3273ea75b03a91b81a9ee1e60a342ff5ad26de3af159d2c71dbbb1a81d5dba8bed9f379a900172"
];

$refreshTokenSecret = [
    "LOCAL" => "5b0f47e33e9b1d6bd484199f57917290f331c0e2a2c16a695b770512f458129762886d8e8fca2dc0f896fd7cb4cb0031ba24982a5dcb9a1b6238b77626917639",
    "TEST" => "f122e806124c9abbcaf4303bcfc589488ff5de2cc54847bbab2438fcdd62ae2995d5a66898325c6d82151b7a97ec26d2e47dde6886d45b8db881c98f7b2000ec",
    "PROD" => "3e077da317b4d83bbc0ec910bb56c07188911339f60999fcb0ccc5c697097d2f0d5f3fa077a259f11aea34200362c1ac7a64f6f85154a78ce7264b769750fca7"
];