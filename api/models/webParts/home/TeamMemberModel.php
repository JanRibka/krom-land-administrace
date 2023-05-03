<?php

namespace kromLand\api\models\webParts\home;

class TeamMemberModel
{
    public ?int $Id = null;
    public ?string $Image = null;
    public ?string $Name = null;
    public ?string $Description = null;

    public function __construct()
    {
        $arguments = func_get_args();
        $numberOfArguments = func_num_args();

        $constructor = method_exists(
            $this,
            $fn = '__construct'.$numberOfArguments
        );

        if ($constructor) {
            call_user_func_array([$this, $fn], $arguments);
        } else {
            echo 'No matching constructor found for TeamMemberModel'.PHP_EOL;
        }
    }

    public function __construct0()
    {
    }

    public function __construct4(
            $id,
            $image,
            $name,
            $description
        ) {
        $this->Id = $id;
        $this->Image = $image;
        $this->Name = $name;
        $this->Description = $description;
    }
}
?>

