<?php

namespace kromLand\api\repositories;

interface IDashboardRepository
{
    public function getRegistrations(\DateTime|null $dateFrom, \DateTime|null $dateTo): array;
}
