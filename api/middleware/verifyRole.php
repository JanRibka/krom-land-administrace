<?php
namespace kromLand\api\middleware;
use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Psr7\ServerRequest;

function verifyRole(...$allowedRoles) 
{
    return function (ServerRequest $request, Response $response, callable $next) use ($allowedRoles) {
        print_r($request);
        // if (!isset($request->getHeaderLine('userrole'))) {
        //     return $request->sendStatus(401);
        //   }
      
        //   $rolesArray = $allowedRoles;
        //   $result = array_reduce($request['roles'], function($acc, $role) use ($rolesArray) {
        //     return $acc || in_array($role, $rolesArray);
        //   }, false);
      
        //   if (!$result) {
        //     return $request->sendStatus(401);
        //   }
      
        $next();
    };

}
?>