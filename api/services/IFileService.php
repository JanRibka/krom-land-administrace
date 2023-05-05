<?php

namespace kromLand\api\services;

interface IFileService
{
    public function uploadedFileSave(string $sourceDir, string $targetDir): void;

    public function fileCopy(string $sourceFile, string $targetFile): void;

    public function fileDelete(string $sourceFile): void;
}
