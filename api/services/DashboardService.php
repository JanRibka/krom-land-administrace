<?php

namespace kromLand\api\services;

require_once __DIR__.'/./IDashboardService.php';
require_once __DIR__.'/../models/dashboard/DashboardModel.php';

use kromLand\api\models\document\DashboardModel;
use kromLand\api\repositories\IDashboardRepository;
use kromLand\api\repositories\IDashboardService;

class DashboardService implements IDashboardService
{
    private readonly IDashboardRepository $_dashboardRepository;

    public function __construct(IDashboardRepository $pDashboardRepository)
    {
        $this->_dashboardRepository = $pDashboardRepository;
    }

public function getDashboard(): DashboardModel
{
    $registrations = $this->_dashboardRepository->getRegistrations();

    $dashboard = new DashboardModel(
        new \DateTime(),
        new \DateTime(),
        $registrations
    );

    return $dashboard;
}

    public function getRegistrations(): array
    {
        return $this->_dashboardRepository->getRegistrations();
    }
}
