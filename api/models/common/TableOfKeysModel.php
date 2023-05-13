<?php

namespace kromLand\api\models\document;

class TableOfKeysModel
{
    public int $Id;
    public string $GrpupKey;
    public string $Key;
    public string $Name;
    public bool $Enabled;

    public function __construct(int $id, string $groupKey, string $key, string $name, bool $enabled)
    {
        $this->Id = $id;
        $this->GrpupKey = $groupKey;
        $this->Key = $key;
        $this->Name = $name;
        $this->Enabled = $enabled;
    }
}
