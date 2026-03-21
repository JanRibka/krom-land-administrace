<?php

use kromLand\api\enums\ImageLocationEnum;

function getValueFromImageLocationEnumByNumber(int $value): ImageLocationEnum
{
    switch ($value) {
        case 1:
            return ImageLocationEnum::HOME;
        case 2:
            return ImageLocationEnum::TEAM_MEMBERS;
        case 3:
            return ImageLocationEnum::ACTIONS;
        case 4:
            return ImageLocationEnum::ACTION_DETAILS;
        case 5:
            return ImageLocationEnum::GALLERY;
        case 6:
            return ImageLocationEnum::GALLERY_IMAGE;
        case 7:
            return ImageLocationEnum::CONTACT;
        case 8:
            return ImageLocationEnum::WEB_LOGOS;
        case 9:
            return ImageLocationEnum::RENTING;
        default:
            return ImageLocationEnum::UNDEFINED;
    }
}
