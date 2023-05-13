<?php

namespace kromLand\api\services;

use kromLand\api\models\document\DashboardModel;
use kromLand\api\repositories\ICommonRepository;
use kromLand\api\repositories\IDashboardRepository;
use kromLand\api\repositories\IDashboardService;

require_once __DIR__.'/./IDashboardService.php';
require_once __DIR__.'/../models/dashboard/DashboardModel.php';

class DashboardService implements IDashboardService
{
    private readonly IDashboardRepository $_dashboardRepository;
    private readonly ICommonRepository $_commonRepository;

    public function __construct(IDashboardRepository $pDashboardRepository, ICommonRepository $pCommonRepository)
    {
        $this->_dashboardRepository = $pDashboardRepository;
        $this->_commonRepository = $pCommonRepository;
    }

public function getDashboard(): DashboardModel
{
    $dashboard = new DashboardModel(
        new \DateTime(),
        new \DateTime(),
        []
    );

    return $dashboard;
}

    public function getRegistrations(): array
    {
        $childArrivesKeys = $this->_commonRepository->getTableOfKeyByGroupKey('CHILD_ARRIVES');
        $paymentMethodKeys = $this->_commonRepository->getTableOfKeyByGroupKey('PAYMENT_METHOD');
        $registrationStateKeys = $this->_commonRepository->getTableOfKeyByGroupKey('REGISTRATION_STATE');
        $registrations = $this->_dashboardRepository->getRegistrations();

        $result = array_map(function ($item) use ($childArrivesKeys, $paymentMethodKeys, $registrationStateKeys) {
            $childArrivesName = array_reduce($childArrivesKeys, function ($result, $keyItem) use ($item) {
                if ($keyItem->Id === $item->other_how_children_arrives) {
                    return $keyItem->Name;
                }

                return $result;
            }, '');

            $paymentMethodName = array_reduce($paymentMethodKeys, function ($result, $keyItem) use ($item) {
                if ($keyItem->Id === $item->other_pay_method) {
                    return $keyItem->Name;
                }

                return $result;
            }, '');

            $registrationStateName = array_reduce($registrationStateKeys, function ($result, $keyItem) use ($item) {
                if ($keyItem->Id === $item->state) {
                    return $keyItem->Name;
                }

                return $result;
            }, '');

            $item->other_how_children_arrives_name = $childArrivesName;
            $item->other_pay_method_name = $paymentMethodName;
            $item->state_name = $registrationStateName;

            return $item;
        }, $registrations);

        return $result;
    }
}
