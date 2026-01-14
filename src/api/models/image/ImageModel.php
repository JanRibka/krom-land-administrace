<?php

namespace kromLand\api\models\image;

class ImageModel
{
    public string $Path;
    public string $Alt;
    public string $Name;

    public function __construct(string $path, string $alt, string $name)
    {
        $this->Path = $path;
        $this->Alt = $alt;
        $this->Name = $name;
    }
}
