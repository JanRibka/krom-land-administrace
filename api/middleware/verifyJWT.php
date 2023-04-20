<?php
namespace kromLand\api\middleware;

require_once __DIR__ . "/../constants/global.php";
require_once __DIR__ . "/../../vendor/autoload.php";

use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Psr7\ServerRequest;

    function verifyJWT(ServerRequest $request, Response $response, callable $next): Response
    {      
        $authHeader = $request->getHeaderLine('HTTP_AUTHORIZATION');

        if (!$authHeader) {
          return $response->withStatus(HTTP_STATUS_CODE_UNAUTHORIZED);
        }

        $token = explode(' ', $authHeader)[1];

        try {
          global $accessTokenSecret;          

          $key = new Key($accessTokenSecret[APP_ENV], 'HS256');
          $decoded = JWT::decode($token, $key);
          $request = $request->withAttribute('username', $decoded->username);
          
          return $next($request, $response);
        } catch (Exception $e) {
          return $response->withStatus(HTTP_STATUS_CODE_FORBIDDEN);
        }
    }
?>