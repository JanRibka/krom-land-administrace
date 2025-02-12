<?php

namespace kromLand\api\services;

require_once __DIR__.'/./IFileService.php';

class FileService implements IFileService
{
    public function uploadedFileSave(string $sourceDir, string $targetDir): void
    {
        move_uploaded_file($sourceDir, $targetDir);
    }

    public function fileCopy(string $sourceFile, string $targetFile): void
    {
        if (is_file($sourceFile)) {
            copy($sourceFile, $targetFile);
        }
    }

    public function fileDelete(string $sourceFile): void
    {
        if (is_file($sourceFile)) {
            unlink($sourceFile);
        }
    }

    public function getAllFiles(string $dir): array
    {
        return scandir($dir);
    }
}
