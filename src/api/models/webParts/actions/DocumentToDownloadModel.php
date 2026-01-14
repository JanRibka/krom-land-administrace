<?php

namespace kromLand\api\models\webParts\actions;

class DocumentToDownloadModel
{
    public $Id;
    public $Document;

    public function __construct(
    $id,
    $document
  ) {
        $this->Id = $id;
        $this->Document = $document;
    }
}
