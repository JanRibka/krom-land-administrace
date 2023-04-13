<?php
namespace komLand\api\controllers;

require_once __DIR__ . "/../enums/httpStatucCode.php";
require_once __DIR__ . "/./ControllerBase.php";
require_once __DIR__ . "/../repositories/AuthenticationRepository.php";

use Firebase\JWT\JWT;

use kromLand\api\controllers\ControllerBase;
use kromLand\api\models\UserModel;
use kromLand\api\services\IAuthenticationService;
use Exception;
use kromLand\api\services\AuthenticationService;
use kromLand\api\repositories\AuthenticationRepository;

// TODO: Jde volat controller pouze pokud jsem autorizovan? Tady to asi nebude potřeba, jenom v ostatních controllerech


class AuthenticationController extends ControllerBase
{
    private readonly IAuthenticationService $_authenticationService;

    public function __construct(IAuthenticationService $pAuthenticationService)
    {
        $this->_authenticationService = $pAuthenticationService;
    }
    
    /**
     * Register new user
     */
    public function register()
    {        
        try
        {            
            $data = json_decode(file_get_contents('php://input'), true);
            $userName = $data['userName'];
            $password = $data['password'];

            if (!!!$userName || !!!$password) {
                $this->apiResponse(false, "Uživatelské jméno a heslo jsou povinné", null, HTTP_STATUS_CODE_BAD_REQUEST);
                die;
            }
            
            // Check for duplicate usernames in DB
            $duplicate = $this->_authenticationService->getDuplicateUser($userName);
            
            if ($duplicate)
            {
                // Conflict
                $this->apiResponse(false, "Uživatelské jméno již existuje", null, HTTP_STATUS_CODE_CONFLICT);
                die;
            }
            
            // Encrypt the password
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            
            // Store the new user
            $user = new UserModel();
            $user->UserName = $userName;
            $user->Password = $hashedPassword;

            $userId = $this->_authenticationService->insertUser($user);
            
            $this->apiResponse(true, "Uživatel " . $user . " byl vytvořen", $userId, HTTP_STATUS_CODE_CREATED);            
        }
        catch(Exception $ex) 
        {
            $this->apiResponse(false, $ex->getMessage(), null, HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR);            
        }
    }
    
    /**
     * Login user
     */
    public function login() 
    {
        try
        {
            $data = json_decode(file_get_contents('php://input'), true);
            $userName = $data['userName'];
            $password = $data['password'];
            
            if (!!!$userName || !!!$password) {
                $this->apiResponse(false, "Uživatelské jméno a heslo jsou povinné", null, HTTP_STATUS_CODE_BAD_REQUEST);                
                die;
            }
            
            $dbUser = $this->_authenticationService->getUserByUserName($userName);
            
            if(!!!$dbUser) 
            {
                // Unauthorized
                $this->apiResponse(false, "Nesprávné uživatelské jméno, nebo heslo", null, HTTP_STATUS_CODE_UNAUTHORIZED);                
                die;
            }
            
            // Evalueate password
            $match = password_verify($password, $dbUser->Password);
            
            if ($match) {
                // Create JWTs (JSON Web Tokens)
                $accessTokenSecret = $_ENV["ACCESS_TOKEN_SECRET"];
                $payload = [
                    "userName" => $dbUser->UserName,
                    "exp" => time() + 30
                ];
                $accessToken = JWT::encode($payload, $accessTokenSecret, "HS256");

                $refreshTokenSecret = $_ENV["REFRESH_TOKEN_SECRET"];
                $payload = [
                    "userName" => $dbUser->UserName,
                    "exp" => time() + 24 * 60 * 60
                ];
                $refreshToken = JWT::encode($payload, $refreshTokenSecret, "HS256");

                // Saving refreshToken with current user
                $user = new UserModel();
                $user->Id = $dbUser->Id;
                $user->UserName = $dbUser;
                $user->RefreshToken = $refreshToken;

                $this->_authenticationService->updatetUser($user);

                setcookie('jwt', $refreshToken, [
                    'expires' => time() + 24 * 60 * 60,
                    'path' => '/',
                    'httponly' => true
                ]);
                
                $this->apiResponse(true, "Nesprávné uživatelské jméno, nebo heslo", $accessToken);                
            } else {
                $this->apiResponse(false, "Nesprávné uživatelské jméno, nebo heslo", null, HTTP_STATUS_CODE_UNAUTHORIZED);                               
            }
        }
        catch(Exception $ex) 
        {
            $this->apiResponse(false, $ex->getMessage(), null, HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') { 
    if (isset($_GET['function'])) { 
        $functionName = $_GET['function']; 
        $authenticationRepository = new AuthenticationRepository();
        $authenticationService = new AuthenticationService($authenticationRepository);
        $controller = new AuthenticationController($authenticationService); 
        
        if (method_exists($controller, $functionName)) { 
            call_user_func([$controller, $functionName]); 
        } else {            
            echo json_encode(['error' => 'Chybná funkce nebo nebyla zadána']); 
        } 
    } 
}
?>