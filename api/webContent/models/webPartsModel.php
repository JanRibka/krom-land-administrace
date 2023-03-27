<?php
class WebPartsModel
{
  public $Home;
  public $Actions;
  public $Gallery;
  public $Contact;
  public $Conditions;

  public function __construct($home, $actions, $gallery, $contact, $conditions)
  {
    $this->Home = $home;
    $this->Actions = $actions;
    $this->Gallery = $gallery;
    $this->Contact = $contact;
    $this->Conditions = $conditions;
  }
}

?>