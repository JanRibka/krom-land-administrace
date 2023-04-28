<?php
    namespace kromLand\api\models\home;

    class TeamMembersModel
    {
        public ?int $Id = null;
        public ?string $Image = null;
        public ?string $Name = null;
        public ?string $Descritpion = null;

        public function __construct() {}

        public function __construct2(
            $id,
            $image,
            $name,
            $descritpion
        ) 
        {
            $this->$Id = $id
        }
    }
?>

<!-- TODO: https://sebhastian.com/php-multiple-constructors/ --