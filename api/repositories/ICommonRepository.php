<?php

namespace kromLand\api\repositories;

interface ICommonRepository
{
    public function getDropDownsData();

    public function getTableOfKeyByGroupKey(string $groupKey) : array;

    public function getVariableSymbolById(int $variableSymbolId) : string;
}
