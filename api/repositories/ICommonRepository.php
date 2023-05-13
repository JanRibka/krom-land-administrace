<?php

namespace kromLand\api\repositories;

interface ICommonRepository
{
    public function getTableOfKeyByGroupKey(string $groupKey): array;
}
