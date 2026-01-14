<?php

namespace kromLand\api\services;

use kromLand\api\models\document\DocumentModel;

interface IDocumentService
{
    public function documentSave(DocumentModel $document, int|null $id): int|null;

    public function documentDelete(int|null $id): void;
}
