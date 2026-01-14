<?php

namespace kromLand\api\models\webParts\actions;

class ActionDetailModel
{
    public $Id;
    public $ActionsId;
    public $ActionOrder;
    public $MonthName;
    public $Image;
    public $ActionName;
    public $ActionDescritption;
    public $VideoLink;
    public $Price;
    public $IsPriceRemark;
    public $PriceRemark;
    public $Place;
    public $Date;
    public $CapacityFull;
    public $Delete;
    public $DisplayTShirtSize;

    public function __construct(
        $id,
        $actionsId,
        $actionOrder,
        $monthName,
        $image,
        $actionName,
        $actionDescritption,
        $videoLink,
        $price,
        $isPriceRemark,
        $priceRemark,
        $place,
        $date,
        $capacityFull,
        $displayTShirtSize
    ) {
        $this->Id = $id;
        $this->ActionsId = $actionsId;
        $this->ActionOrder = $actionOrder;
        $this->MonthName = $monthName;
        $this->Image = $image;
        $this->ActionName = $actionName;
        $this->ActionDescritption = $actionDescritption;
        $this->VideoLink = $videoLink;
        $this->Price = $price;
        $this->IsPriceRemark = $isPriceRemark;
        $this->PriceRemark = $priceRemark;
        $this->Place = $place;
        $this->Date = $date;
        $this->CapacityFull = $capacityFull;
        $this->DisplayTShirtSize = $displayTShirtSize;
    }
}
