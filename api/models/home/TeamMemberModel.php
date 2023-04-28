<?php
    namespace kromLand\api\models\home;

    class TeamMemberModel
    {
        public ?int $Id = null;
        public ?string $Image = null;
        public ?string $Name = null;
        public ?string $Descritpion = null;

        public function __construct() {
            $arguments = func_get_args();
            $numberOfArguments = func_num_args();
    
            $constructor = method_exists(
                $this,
                $fn = "__construct" . $numberOfArguments
            );
    
            if ($constructor) {
                call_user_func_array([$this, $fn], $arguments);
            } else {
                print "No matching constructor found" . PHP_EOL;
            }
        }

        public function __construct1() {}

        public function __construct2(
            $id,
            $image,
            $name,
            $descritpion
        ) {
            $this->Id = $id;
            $this->Image = $image;
            $this->Name = $name;
            $this->Descritpion = $descritpion;
        }
    }
?>

