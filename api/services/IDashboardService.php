<?php

namespace kromLand\api\repositories;

use kromLand\api\models\document\DashboardModel;

interface IDashboardService
{
    public function getDashboard(): DashboardModel;

    public function getRegistrations(string $dateFrom, string $dateTo): array;
}
