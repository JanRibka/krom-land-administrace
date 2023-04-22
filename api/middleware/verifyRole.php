<?php
namespace kromLand\api\middleware;

require_once __DIR__ . "/../enums/UserRoleEnum.php";

use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Psr7\ServerRequest;
use kromLand\api\enums\HttpStatusCode;

function verifyRole($allowedRoles) 
{
    return function (ServerRequest $request, Response $response, callable $next, bool $disableAuth = false) use ($allowedRoles) 
    {
        if ($disableAuth) return $next($request, $response);
        
        $userRole = $request->getAttribute('userrole');
      
        if (!isset($userRole)) {
            return $response->withStatus(HttpStatusCode::UNAUTHORIZED);
        }    

        $result = array_reduce([$userRole], 
        function($acc, $role) use ($allowedRoles) {
                    return $acc || in_array($role, $allowedRoles);
                }, false);
      
        if (!$result) {
            return $response->withStatus(HttpStatusCode::UNAUTHORIZED);
        }
      
        return $next($request, $response);
    };

}
?>