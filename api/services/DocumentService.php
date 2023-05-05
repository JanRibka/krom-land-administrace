<?php

namespace kromLand\api\services;

use kromLand\api\models\document\DocumentModel;
use kromLand\api\repositories\IDocumentRepository;

require_once __DIR__.'/./IDocumentService.php';

class DocumentService implements IDocumentService
{
    private readonly IDocumentRepository $_documentRepository;

    public function __construct(IDocumentRepository $pDocumentRepository)
    {
        $this->_documentRepository = $pDocumentRepository;
    }

    public function documentSave(DocumentModel $document, int|null $id): int|null
    {
        $documentEncoded = json_encode($document);

        if (isset($id)) {
            $this->_documentRepository->documentUpdate($documentEncoded, $id);

            return null;
        } else {
            return $this->_documentRepository->documentInsert($documentEncoded);
        }
    }

    public function documentDelete(int|null $id): void
    {
        if (isset($id)) {
            $this->_documentRepository->documentDelete($id);
        }
    }
}
