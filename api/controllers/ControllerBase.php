<?php
namespace kromLand\api\controllers;

require_once __DIR__ . "/../enums/httpStatucCode.php";

class ControllerBase 
{
    protected function apiResponse(bool $success, string $msg, $data = null, $httpResponse = HTTP_STATUS_CODE_OK)
    {
        http_response_code($httpResponse);

        echo JSON([
            "Success" => $success,
            "ErrMsg" => $msg,
            "Data" => $data,
        ]);
    }
}
?>