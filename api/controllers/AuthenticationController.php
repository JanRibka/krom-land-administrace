<?php
namespace komLand\api\controllers;

require_once __DIR__ . "/../enums/httpStatucCode.php";

use Dotenv\Dotenv;
use Firebase\JWT\JWT;
use Dibi;

use kromLand\api\controllers\ControllerBase;
use kromLand\api\models\UserModel;
use kromLand\api\services\ILoginService;
use Exception;
// TODO: Jde volat controller pouze pokud jsem autorizovan? Tady to asi nebude potřeba, jenom v ostatních controllerech


class AuthenticationController extends ControllerBase
{
    private readonly ILoginService $_loginService;

    /**
     * Register new user
     */
    public function __construct(ILoginService $pLoginService)
    {
        $this->_loginService = $pLoginService;
    }

    public function register()
    {
        try
        {

            $data = json_decode(file_get_contents('php://input'), true);
            $userName = $data['userName'];
            $password = $data['password'];
            
            if (!!!$userName || !!!$password) {
                http_response_code(HTTP_STATUS_CODE_BAD_REQUEST);
                echo "Uživatelské jméno a heslo jsou povinné";
            }
            
            // Check for duplicate usernames in DB
            $duplicate = $this->_loginService->getDuplicateUser($userName);
            
            if ($duplicate)
            {
                http_response_code(HTTP_STATUS_CODE_CONFLICT); // Conflict
                echo "Uživatelské jméno již existuje";
            }
            
            // Encrypt the password
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            
            // Store the new user
            $user = new UserModel();
            $user->UserName = $userName;
            $user->Password = $hashedPassword;
            
            http_response_code(HTTP_STATUS_CODE_CREATED);
            echo "Uživatel " . $user . " byl vytvořen";
        }
        catch(Exception $ex) 
        {
            http_response_code(HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR);
            echo $ex->getMessage();
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
                http_response_code(HTTP_STATUS_CODE_BAD_REQUEST);
                echo "Uživatelské jméno a heslo jsou povinné";
            }
            
            $dbUser = $this->_loginService->getUserByUserName($userName);
            
            if(!!!$dbUser) 
            {
                http_response_code(HTTP_STATUS_CODE_UNAUTHORIZED); // Unauthorized
                echo "Nesprávné uživatelské jméno, nebo heslo";
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

                $this->_loginService->updatetUser($user);

                setcookie('jwt', $refreshToken, [
                    'expires' => time() + 24 * 60 * 60,
                    'path' => '/',
                    'httponly' => true
                ]);
                http_response_code(HTTP_STATUS_CODE_OK);
                echo $accessToken;
            } else {
                http_response_code(HTTP_STATUS_CODE_UNAUTHORIZED);
                echo "Nesprávné uživatelské jméno, nebo heslo";
            }
        }
        catch(Exception $ex) 
        {
            http_response_code(HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR);
            echo $ex->getMessage();
        }
    }
}
?>