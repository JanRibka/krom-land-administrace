<?php

namespace kromLand\api\services;

use kromLand\api\models\document\DocumentModel;

interface IDocumentService
{
    public function uploadedFileSaveOnServer(string $sourceDir, string $targetDir): void;

    public function fileCopy(string $sourceFile, string $targetFile): void;

    public function fileDeleteFromServer(string $sourceFile): void;

    public function documentSaveIntoDb(DocumentModel $document, int|null $id): int|null;

    public function documentDeleteFromDb(int|null $id): void;
}
