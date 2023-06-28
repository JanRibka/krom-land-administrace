<?php

namespace kromLand\api\services;

require_once __DIR__.'/./ICommonService.php';

class CommonService implements ICommonService
{
    private readonly IFileService $_fileService;

    public function __construct(IFileService $pFileService)
    {
        $this->_fileService = $pFileService;
    }

    public function cleanUp(): void
    {
        $targetDir = __DIR__.'/../../upload/';
        $files = $this->_fileService->getAllFiles($targetDir);

        foreach ($files as $file) {
            if ($file !== '.' && $file !== '..') {
                $this->_fileService->fileDelete($targetDir.$file);
            }
        }
    }
}
