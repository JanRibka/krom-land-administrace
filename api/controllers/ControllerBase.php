<?php

namespace kromLand\api\controllers;

use kromLand\api\enums\HttpStatusCode;

require_once __DIR__.'/../enums/httpStatucCode.php';

class ControllerBase
{
    protected function apiResponse(bool $success, string $msg, $data = null, $httpResponse = HttpStatusCode::OK)
    {
        http_response_code($httpResponse);

        echo json_encode([
            'Success' => $success,
            'ErrMsg' => $msg,
            'Data' => $data,
        ], JSON_UNESCAPED_UNICODE);
    }
}
