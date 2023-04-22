<?php
namespace kromLand\api\middleware;

require_once __DIR__ . "/../enums/UserRoleEnum.php";

use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Psr7\ServerRequest;
use kromLand\api\enums\HttpStatusCode;

function verifyRole($allowedRoles) 
{
    return function (ServerRequest $request, Response $response, callable $next) use ($allowedRoles) {
        $userRole = $request->getAttribute('username');
        
        if (!isset($userRole)) {
            return $response->withStatus(HttpStatusCode::UNAUTHORIZED);
        }      
        
        //   $result = array_reduce($request['roles'], function($acc, $role) use ($rolesArray) {
        //     return $acc || in_array($role, $rolesArray);
        //   }, false);
      
        //   if (!$result) {
        //     return $request->sendStatus(401);
        //   }
      
        return $next($request, $response);
    };

}
?>