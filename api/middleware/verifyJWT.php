<?php
use Dotenv\Dotenv;
use Firebase\JWT\JWT;

    function verifyJWT($request, $response, $next)
    {
        $authHeader = $request->getHeaderLine('Authorization');

        if (!$authHeader) {
          return $response->withStatus(HTTP_STATUS_CODE_UNAUTHORIZED);
        }

        $token = explode(' ', $authHeader)[1];

        try {
          $decoded = JWT::decode($token, $_ENV['ACCESS_TOKEN_SECRET']);
          $request = $request->withAttribute('user', $decoded->username);
          
          return $next($request, $response);
        } catch (Exception $e) {
          return $response->withStatus(HTTP_STATUS_CODE_FORBIDDEN);
        }
    }
?>