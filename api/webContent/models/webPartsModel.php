<?php
class WebPartsModel
{
  public $Home;
  public $Actions;
  public $Gallery;
  public $Contact;

  public function __construct($home, $actions, $gallery, $contact)
  {
    $this->Home = $home;
    $this->Actions = $actions;
    $this->Gallery = $gallery;
    $this->Contact = $contact;
  }
}

?>