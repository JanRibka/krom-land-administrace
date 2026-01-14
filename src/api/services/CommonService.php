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
        $fileNames = $this->_fileService->getAllFiles($targetDir);

        foreach ($fileNames as $fileName) {
            if ($fileName !== '.' && $fileName !== '..') {
                $createdTimestamp = filectime($targetDir.$fileName);
                $createdDateTime = new \DateTime();
                $createdDateTime->setTimestamp($createdTimestamp);
                $weekAgo = new \DateTime('-1 week');

                if ($createdDateTime < $weekAgo) {
                    $this->_fileService->fileDelete($targetDir.$fileName);
                }
            }
        }
    }
}
