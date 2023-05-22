<?php

namespace kromLand\api\services;

use kromLand\api\models\dashboard\RegistrationEditModel;
use kromLand\api\models\dashboard\SelectsDataModel;
use kromLand\api\models\document\DashboardModel;
use kromLand\api\models\document\RegistrationModel;
use kromLand\api\repositories\ICommonRepository;
use kromLand\api\repositories\IDashboardRepository;
use kromLand\api\repositories\IDashboardService;

require_once __DIR__.'/./IDashboardService.php';
require_once __DIR__.'/../models/dashboard/DashboardModel.php';
require_once __DIR__.'/../models/dashboard/RegistrationEditModel.php';
require_once __DIR__.'/../models/dashboard/SelectsDataModel.php';

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

    public function getRegistrations(string $dateFrom, string $dateTo): array
    {
        $newDateFrom = $dateFrom === 'null' ? null : new \DateTime($dateFrom);
        $newDateTo = $dateTo === 'null' ? null : new \DateTime($dateTo);

        $childArrivesKeys = $this->_commonRepository->getTableOfKeyByGroupKey('CHILD_ARRIVES');
        $paymentMethodKeys = $this->_commonRepository->getTableOfKeyByGroupKey('PAYMENT_METHOD');
        $registrationStateKeys = $this->_commonRepository->getTableOfKeyByGroupKey('REGISTRATION_STATE');
        $registrations = $this->_dashboardRepository->getRegistrations($newDateFrom, $newDateTo);

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

            $variableSymbol = $this->_commonRepository->getVariableSymbolById($item->id_variable_symbol);

            $item->other_how_children_arrives_name = $childArrivesName;
            $item->other_pay_method_name = $paymentMethodName;
            $item->state_name = $registrationStateName;
            $item->variable_symbol_name = $variableSymbol;

            return $item;
        }, $registrations);

        return $result;
    }

    public function getRegistrationForEdit(string $id): RegistrationEditModel
    {
        $newId = (int) $id;
        $result = new RegistrationEditModel();

        $registration = $this->_dashboardRepository->getRegistration($newId);
        $variableSymbol = $this->_commonRepository->getVariableSymbolById($registration->id_variable_symbol);
        $childArrivesKeys = $this->_commonRepository->getTableOfKeyByGroupKey('CHILD_ARRIVES');
        $paymentMethodKeys = $this->_commonRepository->getTableOfKeyByGroupKey('PAYMENT_METHOD');
        $registrationStateKeys = $this->_commonRepository->getTableOfKeyByGroupKey('REGISTRATION_STATE');

        $result->Registration = $registration;
        $result->Registration->variable_symbol_name = $variableSymbol;
        $result->SelectsData = new SelectsDataModel(
            $childArrivesKeys,
            $paymentMethodKeys,
            $registrationStateKeys
        );

        return $result;
    }

    public function registrationUpdate(string $registrationEncoded): void
    {
        $registrationDecoded = json_decode($registrationEncoded);
        $registration = new RegistrationModel();

        $registration->id = $registrationDecoded->id;
        $registration->id_action = $registrationDecoded->id_action;
        $registration->action_name = $registrationDecoded->action_name;
        $registration->user_email = $registrationDecoded->user_email;
        $registration->child_name = $registrationDecoded->child_name;
        $registration->child_last_name = $registrationDecoded->child_last_name;
        $registration->child_birthday = $registrationDecoded->child_birthday;
        $registration->first_representative_name = $registrationDecoded->first_representative_name;
        $registration->first_representative_last_name = $registrationDecoded->first_representative_last_name;
        $registration->first_representative_phone_number = $registrationDecoded->first_representative_phone_number;
        $registration->second_representative_name = $registrationDecoded->second_representative_name;
        $registration->second_representative_last_name = $registrationDecoded->second_representative_last_name;
        $registration->second_representative_phone_number = $registrationDecoded->second_representative_phone_number;
        $registration->address_name = $registrationDecoded->address_name;
        $registration->address_last_name = $registrationDecoded->address_last_name;
        $registration->address_street_cp = $registrationDecoded->address_street_cp;
        $registration->address_city = $registrationDecoded->address_city;
        $registration->address_psc = $registrationDecoded->address_psc;
        $registration->other_hendicap = $registrationDecoded->other_hendicap;
        $registration->other_photos = $registrationDecoded->other_photos;
        $registration->other_how_children_arrives = $registrationDecoded->other_how_children_arrives;
        $registration->other_pickup_person = $registrationDecoded->other_pickup_person;
        $registration->other_pay_method = $registrationDecoded->other_pay_method;
        $registration->other_other_info = $registrationDecoded->other_other_info;
        $registration->payed = $registrationDecoded->payed;
        $registration->state = $registrationDecoded->state;
        $registration->action_price = $registrationDecoded->action_price;

        $this->_dashboardRepository->registrationUpdate($registration);
    }

    public function registrationDelete(string $id): void
    {
        $newId = (int) $id;

        $this->_dashboardRepository->registrationDelete($newId);
    }
}
