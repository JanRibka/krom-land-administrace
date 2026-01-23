<?php

declare(strict_types=1);

namespace kromLand\api\dataObjects\home;

class HomeData
{
    public function __construct(
        public readonly int $IdHome,
        public readonly string $Title,
        public readonly string $Description,
        public readonly string $PageHeaderTextMain,
        public readonly string $PageHeaderTextMainColor,
        public readonly string $PageHeaderTextSecondary,
        public readonly string $PageHeaderTextSecondaryColor,
    ) {
    }
}
