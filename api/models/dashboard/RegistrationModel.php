<?php

namespace kromLand\api\models\document;

class RegistrationModel
{
    public int $id_action;
    public string $action_name;
    public string $user_email;
    public string $child_name;
    public string $child_last_name;
    public string $child_birthday;
    public string $first_representative_name;
    public string $first_representative_last_name;
    public string $first_representative_phone_number;
    public string $second_representative_name;
    public string $second_representative_last_name;
    public string $second_representative_phone_number;
    public string $address_name;
    public string $address_last_name;
    public string $address_street_cp;
    public string $address_city;
    public string $address_psc;
    public string $other_hendicap;
    public ?bool $other_photos;
    public int $other_how_children_arrives;
    public string $other_pickup_person;
    public int $other_pay_method;
    public string $other_other_info;
    public \DateTime $registration_date;
    public bool $payed;
    public int $state;
    public int $id_variable_symbol;
    public int $action_price;
}
