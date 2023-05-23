<?php

use GuzzleHttp\Psr7\Response;

require_once __DIR__.'/./ControllerBase.php';
require_once __DIR__.'/../middleware/verifyJWT.php';
require_once __DIR__.'/../middleware/verifyRole.php';
require_once __DIR__.'/../../vendor/autoload.php';
require_once __DIR__.'/../enums/UserRoleEnum.php';
require_once __DIR__.'/../repositories/WebSettingsRepository.php';
require_once __DIR__.'/../services/WebSettingsService.php';

use GuzzleHttp\Psr7\ServerRequest;
use kromLand\api\controllers\ControllerBase;
use kromLand\api\enums\HttpStatusCode;
use kromLand\api\enums\UserRoleEnum;
use kromLand\api\repositories\IWebSettingsService;
use kromLand\api\repositories\WebSettingsRepository;
use kromLand\api\services\WebSettingsService;

use function kromLand\api\middleware\verifyJWT;
use function kromLand\api\middleware\verifyRole;

class WebSettingsController extends ControllerBase
{
    private readonly IWebSettingsService $_webSettingsService;

    public function __construct(IWebSettingsService $pWebSettingsService)
    {
        $this->_webSettingsService = $pWebSettingsService;
    }

    /**
     * Get web settings.
     */
    public function getWebSettings()
    {
        try {
            $webSettings = $this->_webSettingsService->getWebSettings(1);

            $this->apiResponse(true, '', $webSettings);
        } catch (Exception $ex) {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Web settings update.
     */
    public function webSettingsUpdate()
    {
        try {
            $webSettingsJson = file_get_contents('php://input');

            $this->_webSettingsService->webSettingsUpdate($webSettingsJson);

            $this->apiResponse(true, '');
        } catch (Exception $ex) {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get web logos.
     */
    public function getWebLogos()
    {
        try {
            $webLogos = $this->_webSettingsService->getWebLogos(1);

            $this->apiResponse(true, '', $webLogos);
        } catch (Exception $ex) {
            $this->apiResponse(false, $ex->getMessage(), null, HttpStatusCode::INTERNAL_SERVER_ERROR);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['function'])) {
        $functionName = $_GET['function'];
        $userRoles = [UserRoleEnum::ADMIN];

        $webSettingsRepository = new WebSettingsRepository();
        $webSettingsService = new WebSettingsService($webSettingsRepository);
        $controller = new WebSettingsController($webSettingsService);

        if (method_exists($controller, $functionName)) {
            $request = new ServerRequest(
                $_SERVER['REQUEST_METHOD'],
                $_SERVER['REQUEST_URI'],
                $_SERVER
            );
            $response = new Response();
            $response = verifyJWT($request, $response,
                function ($request, $response) use ($controller, $functionName, $userRoles) {
                    return verifyRole($userRoles)($request, $response,
                        function ($request, $response) use ($controller, $functionName) {
                            call_user_func([$controller, $functionName]);

                            return $response;
                        }, false);
                }, false);

            $statusCode = $response->getStatusCode();

            if ($statusCode !== HttpStatusCode::OK) {
                http_response_code($response->getStatusCode());
                echo json_encode([
                    'Success' => false,
                    'ErrMsg' => 'Pro provedení akce nemáte dostatečná oprávnění',
                ], JSON_UNESCAPED_UNICODE);
            }
        } else {
            http_response_code(HttpStatusCode::INTERNAL_SERVER_ERROR);
            echo json_encode([
                'Success' => false,
                'ErrMsg' => 'Chybná funkce, nebo nebyla zadána',
            ], JSON_UNESCAPED_UNICODE);
        }
    }
}
