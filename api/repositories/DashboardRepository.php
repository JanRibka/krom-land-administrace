<?php

namespace kromLand\api\repositories;

require_once __DIR__.'/../config/db.php';
require_once __DIR__.'/../../vendor/autoload.php';
require_once __DIR__.'/../../vendor/dibi/dibi/src/Dibi/dibi.php';
require_once __DIR__.'/./IDashboardRepository.php';
require_once __DIR__.'/../models/dashboard/RegistrationModel.php';

use kromLand\api\models\document\RegistrationModel;

class DashboardRepository implements IDashboardRepository
{
    public function getRegistrations(): array
    {
        $registrations = \dibi::query(
            'SELECT * FROM registrations'
        )->fetchAll();

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
            $newRegistration->registration_date = $registraion->registration_date ? new \DateTime($registraion->registration_date) : null;
            $newRegistration->payed = $registraion->payed;
            $newRegistration->state = $registraion->state;
            $newRegistration->id_variable_symbol = $registraion->id_variable_symbol;
            $newRegistration->action_price = $registraion->action_price;

            array_push($registrationsModel, $newRegistration);
        }

        return $registrationsModel;
    }
}
