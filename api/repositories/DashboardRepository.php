<?php

namespace kromLand\api\repositories;

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../vendor/dibi/dibi/src/Dibi/dibi.php';
require_once __DIR__ . '/./IDashboardRepository.php';
require_once __DIR__ . '/../models/dashboard/RegistrationModel.php';

use kromLand\api\models\dashboard\RegistrationModel;

class DashboardRepository implements IDashboardRepository
{
    public function getRegistrations(\DateTime|null $dateFrom, \DateTime|null $dateTo): array
    {
        $dateFromFormatted = $dateFrom?->format('Y-m-d');
        $dateToFormatted = $dateTo?->format('Y-m-d');

        $registrations = \dibi::select('*')
            ->from('registrations')
            ->as('r')
            ->where('r.registration_date BETWEEN IFNULL(%s, "1900-01-01") AND IFNULL(%s, "2999-12-31")', $dateFromFormatted, $dateToFormatted)
            ->fetchAll();

        $registrationsModel = [];

        foreach ($registrations as $registraion) {
            $newRegistration = new RegistrationModel();
            $newRegistration->id = $registraion->id;
            $newRegistration->id_action = $registraion->id_action;
            $newRegistration->action_name = $registraion->action_name;
            $newRegistration->user_email = $registraion->user_email;
            $newRegistration->child_name = $registraion->child_name;
            $newRegistration->child_last_name = $registraion->child_last_name;
            $newRegistration->child_birthday = $registraion->child_birthday;
            $newRegistration->first_representative_name = $registraion->first_representative_name;
            $newRegistration->first_representative_last_name = $registraion->first_representative_last_name;
            $newRegistration->first_representative_phone_number = $registraion->first_representative_phone_number;
            $newRegistration->second_representative_name = $registraion->second_representative_name;
            $newRegistration->second_representative_last_name = $registraion->second_representative_last_name;
            $newRegistration->second_representative_phone_number = $registraion->second_representative_phone_number;
            $newRegistration->address_name = $registraion->address_name;
            $newRegistration->address_last_name = $registraion->address_last_name;
            $newRegistration->address_street_cp = $registraion->address_street_cp;
            $newRegistration->address_city = $registraion->address_city;
            $newRegistration->address_psc = $registraion->address_psc;
            $newRegistration->other_hendicap = $registraion->other_hendicap;
            $newRegistration->other_photos = $registraion->other_photos;
            $newRegistration->other_how_children_arrives = $registraion->other_how_children_arrives;
            $newRegistration->other_pickup_person = $registraion->other_pickup_person;
            $newRegistration->other_pay_method = $registraion->other_pay_method;
            $newRegistration->other_other_info = $registraion->other_other_info;
            $newRegistration->other_t_shirt_size = $registraion->other_t_shirt_size;
            $newRegistration->registration_date = $registraion->registration_date ? new \DateTime($registraion->registration_date) : null;
            $newRegistration->payed = $registraion->payed;
            $newRegistration->state = $registraion->state;
            $newRegistration->id_variable_symbol = $registraion->id_variable_symbol;
            $newRegistration->action_price = $registraion->action_price;

            array_push($registrationsModel, $newRegistration);
        }

        return $registrationsModel;
    }

    public function getRegistration(int $id): RegistrationModel
    {
        $registration = \dibi::select('*')
            ->from('registrations')
            ->as('r')
            ->where('r.Id = %i', $id)
            ->fetch();

        $registrationModel = new RegistrationModel();
        $registrationModel->id = $registration->id;
        $registrationModel->id_action = $registration->id_action;
        $registrationModel->action_name = $registration->action_name;
        $registrationModel->user_email = $registration->user_email;
        $registrationModel->child_name = $registration->child_name;
        $registrationModel->child_last_name = $registration->child_last_name;
        $registrationModel->child_birthday = $registration->child_birthday;
        $registrationModel->first_representative_name = $registration->first_representative_name;
        $registrationModel->first_representative_last_name = $registration->first_representative_last_name;
        $registrationModel->first_representative_phone_number = $registration->first_representative_phone_number;
        $registrationModel->second_representative_name = $registration->second_representative_name;
        $registrationModel->second_representative_last_name = $registration->second_representative_last_name;
        $registrationModel->second_representative_phone_number = $registration->second_representative_phone_number;
        $registrationModel->address_name = $registration->address_name;
        $registrationModel->address_last_name = $registration->address_last_name;
        $registrationModel->address_street_cp = $registration->address_street_cp;
        $registrationModel->address_city = $registration->address_city;
        $registrationModel->address_psc = $registration->address_psc;
        $registrationModel->other_hendicap = $registration->other_hendicap;
        $registrationModel->other_photos = $registration->other_photos;
        $registrationModel->other_how_children_arrives = $registration->other_how_children_arrives;
        $registrationModel->other_pickup_person = $registration->other_pickup_person;
        $registrationModel->other_pay_method = $registration->other_pay_method;
        $registrationModel->other_t_shirt_size = $registration->other_t_shirt_size;
        $registrationModel->other_other_info = $registration->other_other_info;
        $registrationModel->registration_date = $registration->registration_date ? new \DateTime($registration->registration_date) : null;
        $registrationModel->payed = $registration->payed;
        $registrationModel->state = $registration->state;
        $registrationModel->id_variable_symbol = $registration->id_variable_symbol;
        $registrationModel->action_price = $registration->action_price;

        return $registrationModel;
    }

    public function registrationUpdate(RegistrationModel $registration): void
    {
        $id = $registration->id;
        $arr = [
            'id_action' => $registration->id_action,
            'action_name' => $registration->action_name,
            'user_email' => $registration->user_email,
            'child_name' => $registration->child_name,
            'child_last_name' => $registration->child_last_name,
            'child_birthday' => $registration->child_birthday,
            'first_representative_name' => $registration->first_representative_name,
            'first_representative_last_name' => $registration->first_representative_last_name,
            'first_representative_phone_number' => $registration->first_representative_phone_number,
            'second_representative_name' => $registration->second_representative_name,
            'second_representative_last_name' => $registration->second_representative_last_name,
            'second_representative_phone_number' => $registration->second_representative_phone_number,
            'address_name' => $registration->address_name,
            'address_last_name' => $registration->address_last_name,
            'address_street_cp' => $registration->address_street_cp,
            'address_city' => $registration->address_city,
            'address_psc' => $registration->address_psc,
            'other_hendicap' => $registration->other_hendicap,
            'other_photos' => $registration->other_photos,
            'other_how_children_arrives' => $registration->other_how_children_arrives,
            'other_pickup_person' => $registration->other_pickup_person,
            'other_pay_method' => $registration->other_pay_method,
            'other_other_info' => $registration->other_other_info,
            'other_t_shirt_size' => $registration->other_t_shirt_size,
            'payed' => $registration->payed,
            'state' => $registration->state,
            'action_price' => $registration->action_price,
        ];

        \dibi::update('registrations', $arr)
            ->where('id = %i', $id)
            ->execute();
    }

    public function registrationDelete(int $id): void
    {
        \dibi::delete('registrations')
            ->as('r')
            ->where('r.Id = %i', $id)
            ->fetch();
    }
}
