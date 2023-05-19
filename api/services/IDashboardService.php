<?php

namespace kromLand\api\repositories;

use kromLand\api\models\document\DashboardModel;
use kromLand\api\models\document\RegistrationEditModel;

interface IDashboardService
{
    public function getDashboard(): DashboardModel;

    public function getRegistrations(string $dateFrom, string $dateTo): array;

    public function getRegistrationForEdit(string $id): RegistrationEditModel;
}
