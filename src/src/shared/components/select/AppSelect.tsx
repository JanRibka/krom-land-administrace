import React from 'react';

import {
    Box, FormControl, FormHelperText, LinearProgress, MenuItem, SelectChangeEvent
} from '@mui/material';

import AppSelectProps from './AppSelectProps';
import InputLabelStyled from './styledComponents/InputLabelStyled';
import SelectStyled from './styledComponents/SelectStyled';

const AppSelect = (props: AppSelectProps) => {
  const handleOnChangeSelect = (
    event: SelectChangeEvent<any>,
    child: React.ReactNode
  ) => {
    props.setSelectedItem?.(event.target.value);
    props.onChangeSelect?.(event, child);
  };

  const handleOnBlurSelect = (event: any) => {
    props.setSelectedItem?.(event.target.value);
    props.onBlurSelect?.(event);
  };

  const getValue = (selectedItem: string) => {
    if (props.data.length === 0) return "";

    return selectedItem ?? "";
  };

  const labelId = `${props.name}-id-label`;
  const label = props.required ? `${props.label} *` : props.label;
  const disabled = props.isLoading || props.disabled;

  return (
    <FormControl error={props.error} fullWidth sx={{ height: "fit-content" }}>
      <InputLabelStyled id={labelId}>{label}</InputLabelStyled>
      <SelectStyled
        sx={{
          [`.MuiSelect-select.Mui-disabled`]: {
            [`~ fieldset`]: {
              borderColor: props.error ? "error.main" : undefined,
            },
          },
        }}
        id={`${props.name}-id`}
        name={props.name}
        labelId={labelId}
        label={label}
        value={getValue(props.selectedItem)}
        required={props.required}
        disabled={disabled}
        error={props.error}
        onRateChange={props.onInputChange}
        onChange={handleOnChangeSelect}
        onBlur={handleOnBlurSelect}
        MenuProps={{
          sx: {
            [`.MuiList-root`]: {
              borderColor: props.error
                ? "error.main"
                : "rgba(169, 169, 169, 1)",
              borderStyle: "solid",
              borderWidth: "0 1px 1px 1px",
              borderRadius: "0 0 4px 4px",
            },
          },
        }}
      >
        {props?.data?.map((val, i) => {
          return (
            <MenuItem key={`val.label_${i}`} value={val?.value}>
              {val.label}
            </MenuItem>
          );
        })}
      </SelectStyled>

      {props.isLoading && (
        <Box sx={{ marginTop: ".5rem" }}>
          <LinearProgress sx={{ borderRadius: "2px" }} />
        </Box>
      )}

      {!!props.formHelperText && (
        <FormHelperText>{props.formHelperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default AppSelect;
