<?php

namespace kromLand\api\repositories;

use kromLand\api\models\document\RegistrationModel;

interface IDashboardRepository
{
    public function getRegistrations(\DateTime|null $dateFrom, \DateTime|null $dateTo): array;

    public function getRegistration(int $id): RegistrationModel;

    public function registrationUpdate(RegistrationModel $registration): void;

    public function registrationDelete(int $id): void;
}
