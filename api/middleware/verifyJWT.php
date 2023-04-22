<?php
namespace kromLand\api\middleware;

require_once __DIR__ . "/../constants/global.php";
require_once __DIR__ . "/../../vendor/autoload.php";
require_once __DIR__ . "/../enums/UserRoleEnum.php";

use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Psr7\ServerRequest;
use kromLand\api\enums\HttpStatusCode;

    function verifyJWT(ServerRequest $request, Response $response, callable $next, bool $disableAuth = false): Response
    {      
      if ($disableAuth) return $next($request, $response);

      $authHeader = $request->getHeaderLine('HTTP_AUTHORIZATION');

      if (!$authHeader || !str_starts_with($authHeader, "Bearer ")) {
        return $response->withStatus(HttpStatusCode::UNAUTHORIZED);
      }

      $token = explode(' ', $authHeader)[1];

      try {
        global $accessTokenSecret;          

        $key = new Key($accessTokenSecret[APP_ENV], 'HS256');
        $decoded = JWT::decode($token, $key);
        $request = $request->withAttribute('username', $decoded->userinfo->username);
        $request = $request->withAttribute('userrole', $decoded->userinfo->userrole);
        
        return $next($request, $response);
      } catch (Exception $e) {
        return $response->withStatus(HttpStatusCode::FORBIDDEN);
      }
    }
?>