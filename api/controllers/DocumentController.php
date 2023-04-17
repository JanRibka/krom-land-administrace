<?php
use kromLand\api\controllers\ControllerBase;

require_once __DIR__ . "/../middleware/verifyJWT.php";

use function kromLand\api\middleware\verifyJWT;

class DocumentController extends ControllerBase
{
    
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') { 
    if (isset($_GET['function'])) { 
        $functionName = $_GET['function']; 
        // $authenticationRepository = new AuthenticationRepository();
        // $authenticationService = new AuthenticationService($authenticationRepository);
        $controller = new DocumentController();         
        
        if (method_exists($controller, $functionName)) {
            $request;
            $response;
            $response = verifyJWT($request, $response, 
                function($request, $response) use ($controller, $functionName) {
                            call_user_func([$controller, $functionName]);

                            return $response;
                        }
                    );            
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