import React, { useState } from "react";
import AppDatePicker from "shared/components/datePicker/AppDatePicker";
import { registrationsGrindName } from "shared/constants/gridNames";
import { addTimeZoneOffset } from "shared/helpers/dateTimeHelpers";
import { nameof } from "shared/nameof";

import CachedIcon from "@mui/icons-material/Cached";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/system/Stack";

import TableFilterDateStyled from "./styledComponents/TableFilterDateStyled";

export interface IGridSettingsDateFilter {
  from: Date | null;
  to: Date | null;
}

const TableFilterDate = () => {
  // Constants
  const gridSettingsDateFilterName =
    "_grid-settings-date-filter-" + registrationsGrindName;
  const gridSettingsDateFilter = JSON.parse(
    localStorage.getItem(gridSettingsDateFilterName) ?? "{}"
  );
  const gridDateFilter: IGridSettingsDateFilter =
    Object.keys(gridSettingsDateFilter).length > 0
      ? (gridSettingsDateFilter as IGridSettingsDateFilter)
      : ({ from: null, to: null } as IGridSettingsDateFilter);

  // State
  const [dateFilter, setDateFiler] =
    useState<IGridSettingsDateFilter>(gridDateFilter);

  // Other
  const handleDatePickedOnChange = (
    name: string,
    val: Date | null,
    keyboardInputValue?: string
  ) => {
    let newDateFilter: IGridSettingsDateFilter = {
      ...dateFilter,
      [name]: val,
    };

    setDateFiler(newDateFilter);

    newDateFilter = {
      ...newDateFilter,
      from:
        newDateFilter.from === null
          ? null
          : addTimeZoneOffset(newDateFilter.from),
      to:
        newDateFilter.to === null ? null : addTimeZoneOffset(newDateFilter.to),
    };

    localStorage.setItem(
      gridSettingsDateFilterName,
      JSON.stringify(newDateFilter)
    );
  };

  return (
    <TableFilterDateStyled>
      <Stack direction='row' spacing={2}>
        <AppDatePicker
          name={nameof<IGridSettingsDateFilter>("from")}
          label='Datum od'
          value={dateFilter?.from ?? null}
          onChange={handleDatePickedOnChange}
          error={false}
        />

        <AppDatePicker
          name={nameof<IGridSettingsDateFilter>("to")}
          label='Datum do'
          value={dateFilter?.to ?? null}
          onChange={handleDatePickedOnChange}
          error={false}
        />

        <IconButton>
          <CachedIcon />
        </IconButton>
      </Stack>
    </TableFilterDateStyled>
  );
};

export default TableFilterDate;
