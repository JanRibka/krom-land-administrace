<?php

namespace kromLand\api\models\common;

class TableOfKeysModel
{
    public int|null $Id;
    public string $GroupKey;
    public string $Key;
    public int $Value;
    public string $Name;
    public bool $Enabled;

    public function __construct(int|null $id, string $groupKey, string $key, int $value, string $name, bool $enabled)
    {
        $this->Id = $id;
        $this->GroupKey = $groupKey;
        $this->Key = $key;
        $this->Value = $value;
        $this->Name = $name;
        $this->Enabled = $enabled;
    }
}
