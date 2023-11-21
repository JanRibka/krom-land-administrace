<?php

namespace kromLand\api\models\document;

class TableOfKeysModel
{
    public int $Id;
    public string $GroupKey;
    public string $Key;
    public int $Value;
    public string $Name;
    public bool $Enabled;

    public function __construct(int $id, string $groupKey, string $key, int $value, string $name, bool $enabled)
    {
        $this->Id = $id;
        $this->GroupKey = $groupKey;
        $this->Key = $key;
        $this->Value = $value;
        $this->Name = $name;
        $this->Enabled = $enabled;
    }
}
