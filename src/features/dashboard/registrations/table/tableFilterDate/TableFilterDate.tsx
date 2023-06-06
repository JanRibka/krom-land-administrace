import React, { useState } from "react";
import AppDatePicker from "shared/components/datePicker/AppDatePicker";
import { registrationsGridName } from "shared/constants/gridNames";
import { addTimeZoneOffsetSetZeroHours } from "shared/helpers/dateTimeHelpers";
import { useDashboardSlice } from "shared/infrastructure/store/dashboard/useDashboardSlice";
import { nameof } from "shared/nameof";

import CachedIcon from "@mui/icons-material/Cached";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/system/Stack";

import TableFilterDateStyled from "./styledComponents/TableFilterDateStyled";

export interface IGridSettingsDateFilter {
  from: Date | null;
  to: Date | null;
}

const TableFilterDate = () => {
  // Constants
  const { handleDashboardUpdate } = useDashboardSlice();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const gridSettingsDateFilterName = registrationsGridName + "-settings";
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
      [name]: val === null ? null : addTimeZoneOffsetSetZeroHours(val),
    };

    newDateFilter = {
      ...newDateFilter,
      from:
        newDateFilter.from === null
          ? null
          : typeof newDateFilter.from === "string"
          ? new Date(newDateFilter.from)
          : newDateFilter.from,
      to:
        newDateFilter.to === null
          ? null
          : typeof newDateFilter.to === "string"
          ? new Date(newDateFilter.to)
          : newDateFilter.to,
    };

    setDateFiler(newDateFilter);

    localStorage.setItem(
      gridSettingsDateFilterName,
      JSON.stringify(newDateFilter)
    );
  };

  const handleDataReloadOnClick = () => {
    handleDashboardUpdate({ _registrationsLoaded: false });
  };

  return (
    <TableFilterDateStyled>
      <Stack direction={mdDown ? "column" : "row"} spacing={2}>
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

        <Box className='reload-button-wrapper'>
          <IconButton title='Přenačíst data' onClick={handleDataReloadOnClick}>
            <CachedIcon />
          </IconButton>
        </Box>
      </Stack>
    </TableFilterDateStyled>
  );
};

export default TableFilterDate;
