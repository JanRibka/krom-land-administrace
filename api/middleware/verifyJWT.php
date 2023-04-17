<?php
namespace kromLand\api\middleware;

require_once __DIR__ . "/../constants/global.php";

use Exception;
use Firebase\JWT\JWT;

    function verifyJWT($request, $response, $next)
    {
        $authHeader = $request->getHeaderLine('Authorization');

        if (!$authHeader) {
          return $response->withStatus(HTTP_STATUS_CODE_UNAUTHORIZED);
        }

        $token = explode(' ', $authHeader)[1];

        try {
          global $accessTokenSecret;
          $decoded = JWT::decode($token, $accessTokenSecret);
          $request = $request->withAttribute('user', $decoded->username);
          
          return $next($request, $response);
        } catch (Exception $e) {
          return $response->withStatus(HTTP_STATUS_CODE_FORBIDDEN);
        }
    }
?>