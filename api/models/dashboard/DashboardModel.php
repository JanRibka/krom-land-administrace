<?php

namespace kromLand\api\models\document;

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
