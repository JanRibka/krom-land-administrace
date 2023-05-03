<?php

namespace kromLand\api\repositories;

require_once __DIR__.'/../config/db.php';
require_once __DIR__.'/./IDocumentRepository.php';

class DocumentRepository implements IDocumentRepository
{
    public function documentDelete(int $id): void
    {
        \dibi::query('DELETE FROM documentsToDownload as dtd WHERE dtd.Id = %i', $id);
    }

    public function documentInsert(string $document): int
    {
        $arr = [
            'Document' => json_encode($document),
        ];

        \dibi::query(
            'INSERT INTO documentsToDownload',
            $arr
        );

        $id = \dibi::getInsertId();

        return $id;
    }

    public function documentUpdate(string $document, int $id): void
    {
        $arr = [
            'Document' => json_encode($document),
        ];

        \dibi::query(
            'UPDATE documentsToDownload as dtd SET', $arr,
            'WHERE dtd.Id = %i',
            $id
        );
    }
}
