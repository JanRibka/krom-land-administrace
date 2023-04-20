<?php
use kromLand\api\controllers\ControllerBase;

require_once __DIR__ . "/./ControllerBase.php";
require_once __DIR__ . "/../middleware/verifyJWT.php";
require_once __DIR__ . "/../../vendor/autoload.php";

use function kromLand\api\middleware\verifyJWT;
use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Psr7\ServerRequest;

class DocumentController extends ControllerBase
{
    public function test() 
    {
        $this->apiResponse(true, "jgj");
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') { 
    if (isset($_GET['function'])) { 
        $functionName = $_GET['function']; 
        // $authenticationRepository = new AuthenticationRepository();
        // $authenticationService = new AuthenticationService($authenticationRepository);
        $controller = new DocumentController();         
        
        if (method_exists($controller, $functionName)) {                        
            $request = new ServerRequest(
                $_SERVER['REQUEST_METHOD'],
                $_SERVER['REQUEST_URI'],
                $_SERVER
            );            
            $response = new Response();            
            $response = verifyJWT($request, $response, 
                function($request, $response) use ($controller, $functionName) {
                            call_user_func([$controller, $functionName]);
                            
                            return $response;
                        }
                    );

                    $statusCode = $response->getStatusCode();

                    if ($statusCode !== HTTP_STATUS_CODE_OK) {
                        http_response_code($response->getStatusCode());
                        echo json_encode([
                            "Success" => false,
                            "ErrMsg" => "Token se nepodařilo se ověřit"        
                        ], JSON_UNESCAPED_UNICODE);            
                    }                    
        } else {
            http_response_code(HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR);
            echo json_encode([
                "Success" => false,
                "ErrMsg" => "Chybná funkce, nebo nebyla zadána"                
            ], JSON_UNESCAPED_UNICODE);            
        } 
    } 
}
?>