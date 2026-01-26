<?php

namespace kromLand\api\models\image;

class ImageModel
{
    public string $path;
    public string $alt;
    public string $name;
    public ?int $id;

    public function __construct(string $path, string $alt, string $name, ?int $id = null)
    {
        $this->path = $path;
        $this->alt = $alt;
        $this->name = $name;
        $this->id = $id;
    }
}
