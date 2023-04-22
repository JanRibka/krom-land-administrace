<?php
use kromLand\api\controllers\ControllerBase;

require_once __DIR__ . "/./ControllerBase.php";
require_once __DIR__ . "/../middleware/verifyJWT.php";
require_once __DIR__ . "/../middleware/verifyRole.php";
require_once __DIR__ . "/../../vendor/autoload.php";
require_once __DIR__ . "/../enums/UserRoleEnum.php";

use function kromLand\api\middleware\verifyJWT;
use function kromLand\api\middleware\verifyRole;

use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Psr7\ServerRequest;
use kromLand\api\enums\HttpStatusCode;
use kromLand\api\enums\UserRoleEnum;

class DocumentController extends ControllerBase
{
    public function test() 
    {
        $this->apiResponse(true, "jgj");
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') { 
    if (isset($_GET['function'])) { 
        $userRoles = [
            "test" => [
                UserRoleEnum::ADMIN,
                UserRoleEnum::EDITOR
            ]
        ];
        $functionName = $_GET['function']; 
        $controller = new DocumentController();         
        
        if (method_exists($controller, $functionName)) {                        
            $request = new ServerRequest(
                $_SERVER['REQUEST_METHOD'],
                $_SERVER['REQUEST_URI'],
                $_SERVER
            );            
            $response = new Response();       
            $response = verifyJWT($request, $response, 
                function($request, $response) use ($controller, $functionName, $userRoles) {
                    return verifyRole($userRoles[$functionName])($request, $response,
                    function($request, $response) use($controller, $functionName){
                        call_user_func([$controller, $functionName]);
                            
                        return $response;
                    });
                });                  

            $statusCode = $response->getStatusCode();

            if ($statusCode !== HttpStatusCode::OK) {
                http_response_code($response->getStatusCode());
                echo json_encode([
                    "Success" => false,
                    "ErrMsg" => "Token se nepodařilo se ověřit"        
                ], JSON_UNESCAPED_UNICODE);            
            }                    
        } else {
            http_response_code(HttpStatusCode::INTERNAL_SERVER_ERROR);
            echo json_encode([
                "Success" => false,
                "ErrMsg" => "Chybná funkce, nebo nebyla zadána"                
            ], JSON_UNESCAPED_UNICODE);            
        } 
    } 
}
?>