<?php

namespace kromLand\api\models\dashboard;

class DashboardModel
{
    public \DateTime $FilterDateFrom;

    public \DateTime $FilterDateTo;

    public array $Registrations;

    public function __construct(\DateTime $filterDateFrom, \DateTime $filterDateTo, array $registrations)
    {
        $this->FilterDateFrom = $filterDateFrom;
        $this->FilterDateTo = $filterDateTo;
        $this->Registrations = $registrations;
    }
}
