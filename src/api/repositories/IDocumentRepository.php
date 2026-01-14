<?php

namespace kromLand\api\repositories;

interface IDocumentRepository
{
    public function documentDelete(int $id): void;

    public function documentInsert(string $document): int;

    public function documentUpdate(string $document, int $id): void;
}
