<?php

namespace kromLand\api\services;

use kromLand\api\repositories\IDocumentRepository;

class DocumentService implements IDocumentService
{
    private readonly IDocumentRepository $_documentRepository;

    public function __construct(IDocumentRepository $pDocumentRepository)
    {
        $this->_documentRepository = $pDocumentRepository;
    }

    public function uploadedFileSaveOnServer(string $sourceDir, string $targetDir): void
    {
        move_uploaded_file($sourceDir, $targetDir);
    }

    public function fileCopy(string $sourceFile, string $targetFile): void
    {
        copy($sourceFile, $targetFile);
    }

    public function fileDeleteFromServer(string $sourceFile): void
    {
        if (file_exists($sourceFile)) {
            unlink($sourceFile);
        }
    }

    public function documentSaveIntoDb(string $document, int|null $id): int|null
    {
        if (isset($id)) {
            $this->_documentRepository->documentUpdate($document, $id);

            return null;
        } else {
            return $this->_documentRepository->documentInsert($document);
        }
    }

    public function documentDeleteFromDb(int|null $id): void
    {
        if (isset($id)) {
            $this->_documentRepository->documentDelete($id);
        }
    }
}
