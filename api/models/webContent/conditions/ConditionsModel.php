<?php

namespace kromLand\api\models\webContent\conditions;

class ConditionsModel
{
    public $Id;
    public $Label;
    public $Text;

    public function __construct(
    $id,
    $label,
    $text,
  ) {
        $this->Id = $id;
        $this->Label = $label;
        $this->Text = $text;
    }
}
