<?php

namespace kromLand\api\services;

require_once __DIR__.'/./IDashboardService.php';

class CommonService implements ICommonService
{
    private readonly IFileRepository $_fileRepository;

    public function __construct(IFileRepository $pFileRepository)
    {
        $this->_fileRepository = $pFileRepository;
    }

public function cleanUp(): void
{
}
}
