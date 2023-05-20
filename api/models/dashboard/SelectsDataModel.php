<?php

namespace kromLand\api\models\dashboard;

class SelectsDataModel
{
    public array $ChildArrivesData;
    public array $PaymentMethodsData;
    public array $RegistrationStateData;

    public function __construct(array $childArrivesData, array $paymentMethodsData, array $registrationStateData)
    {
        $this->ChildArrivesData = $childArrivesData;
        $this->PaymentMethodsData = $paymentMethodsData;
        $this->RegistrationStateData = $registrationStateData;
    }
}
