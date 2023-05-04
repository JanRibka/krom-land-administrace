<?php

namespace kromLand\api\models\document;

class DocumentModel
{
    public string $Path;
    public string $Name;

    public function __construct(string $path, string $name)
    {
        $this->Path = $path;
        $this->Name = $name;
    }
}
