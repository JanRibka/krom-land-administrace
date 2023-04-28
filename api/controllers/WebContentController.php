<?php
namespace komLand\api\controllers;
use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Psr7\ServerRequest;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json");


require_once __DIR__ . "/./ControllerBase.php";
require_once __DIR__ . "/../enums/httpStatucCode.php";
require_once __DIR__ . "/../enums/UserRoleEnum.php";
require_once __DIR__ . "/../middleware/verifyJWT.php";
require_once __DIR__ . "/../middleware/verifyRole.php";

use function kromLand\api\middleware\verifyJWT;
use function kromLand\api\middleware\verifyRole;

use Exception;
use kromLand\api\controllers\ControllerBase;
use kromLand\api\enums\HttpStatusCode;
use kromLand\api\enums\UserRoleEnum;

class WebContentController extends ControllerBase
{

    public function getHomeData()
    {
        try
        {

        } catch(Exception $ex)
        {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') { 
    if (isset($_GET['function'])) {
        $userRoles = [
            "getHomeData" => [
                UserRoleEnum::ADMIN
            ],
        ];        

        $functionName = $_GET['function'];        
        $authenticationRepository = new AuthenticationRepository();
        $authenticationService = new AuthenticationService($authenticationRepository);
        $controller = new AuthenticationController($authenticationService);         
        
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
                    }, false);
                }, false); 

            $statusCode = $response->getStatusCode();

            if ($statusCode !== HttpStatusCode::OK) {
                http_response_code($response->getStatusCode());
                echo json_encode([
                    "Success" => false,
                    "ErrMsg" => "Pro provedení akce nemáte dostatečná oprávnění"        
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