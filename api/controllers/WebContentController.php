<?php
namespace komLand\api\controllers;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json");


require_once __DIR__ . "/./ControllerBase.php";
require_once __DIR__ . "/../enums/httpStatucCode.php";
require_once __DIR__ . "/../enums/UserRoleEnum.php";
require_once __DIR__ . "/../middleware/verifyJWT.php";
require_once __DIR__ . "/../middleware/verifyRole.php";
require_once __DIR__ . "/../repositories/WebContentRepository.php";
require_once __DIR__ . "/../services/WebContentService.php";

use function kromLand\api\middleware\verifyJWT;
use function kromLand\api\middleware\verifyRole;

use Exception;
use kromLand\api\controllers\ControllerBase;
use kromLand\api\enums\HttpStatusCode;
use kromLand\api\enums\UserRoleEnum;
use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Psr7\ServerRequest;
use kromLand\api\repositories\WebContentRepository;
use kromLand\api\services\WebContentService;
use kromLand\api\services\IWebContentService;

class WebContentController extends ControllerBase
{
    private readonly IWebContentService $_homeService;

    public function __construct(IWebContentService $pHomeService)
    {
        $this->_homeService = $pHomeService;
    }

    public function getHome()
    {
        try
        {
            $home = $this->_homeService->getHome(1);

            $this->apiResponse(true, "", $home);
        } catch(Exception $ex)
        {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') { 
    if (isset($_GET['function'])) {
        $userRoles = [
            "getHome" => [
                UserRoleEnum::ADMIN
            ],
        ];        

        $functionName = $_GET['function'];        
        $webContentRepository = new WebContentRepository();
        $webContentService = new WebContentService($webContentRepository);
        $controller = new WebContentController($webContentService);         
        
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