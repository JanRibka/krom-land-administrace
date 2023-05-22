<?php

namespace kromLand\api\repositories;

use kromLand\api\models\dashboard\RegistrationEditModel;
use kromLand\api\models\document\DashboardModel;
use kromLand\api\models\document\RegistrationModel;

interface IDashboardService
{
    public function getDashboard(): DashboardModel;

    public function getRegistrations(string $dateFrom, string $dateTo): array;

    public function getRegistrationForEdit(string $id): RegistrationEditModel;

    public function registrationUpdate(RegistrationModel $registration): void;

    public function registrationDelete(string $id): void;
}
