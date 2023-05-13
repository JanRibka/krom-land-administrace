<?php

namespace kromLand\api\repositories;

use kromLand\api\models\document\TableOfKeysModel;

require_once __DIR__.'/../config/db.php';
require_once __DIR__.'/../../vendor/autoload.php';
require_once __DIR__.'/../../vendor/dibi/dibi/src/Dibi/dibi.php';
require_once __DIR__.'/./ICommonRepository.php';
require_once __DIR__.'/../models/common/TableOfKeysModel.php';

class CommonRepository implements ICommonRepository
{
    public function getTableOfKeyByGroupKey($groupKey): array
    {
        $tablesOfKeys = \dibi::query(
            'SELECT * FROM tableOfKeys as tok WHERE tok.GroupKey = %s',
            $groupKey
        )->fetchAll();

        $tablesOfKeysModel = [];

        foreach ($tablesOfKeys as $key) {
            $newTableOfKeys = new TableOfKeysModel(
                $key->Id,
                $key->GroupKey,
                $key->Key,
                $key->Name,
                $key->Enabled
            );

            array_push($tablesOfKeysModel, $newTableOfKeys);
        }

        return $tablesOfKeysModel;
    }
}
