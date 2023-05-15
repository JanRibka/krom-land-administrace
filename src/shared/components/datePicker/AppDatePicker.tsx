import dayjs, { Dayjs } from "dayjs";
import React, { useEffect } from "react";
import { addTimeZoneOffset } from "shared/helpers/dateTimeHelpers";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import AppDatePickerStyled from "./styledComponents/AppDatePickerStyled";

interface IProps {
  label: string;
  value: any;
  name: string;
  error?: boolean;
  helperText?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: "off";
  onChange: (
    name: string,
    date: Date | null,
    keyboardInputValue?: string
  ) => void;
}

const AppDatePicker = (props: IProps) => {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  useEffect(() => {
    setValue(dayjs(props.value));
  }, [props.value]);

  const handleOnBlur = (
    e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>
  ) => {
    if (!value) return;
    props.onChange(props.name, value?.toDate());
  };

  const handleOnAccept = (val: unknown) => {
    const newValue = val as Dayjs;

    if (!newValue) return;

    props.onChange(props.name, newValue?.toDate());
  };

  const handleOnChange = (val: unknown) => {
    const newValue = val as Dayjs;
    let date = newValue?.toDate();

    date = addTimeZoneOffset(date);
    setValue(dayjs(date));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='cs'>
      <AppDatePickerStyled
        label={props.label}
        minDate={new Date("0001-01-01")}
        value={value}
        disabled={props.disabled}
        onChange={handleOnChange}
        onAccept={handleOnAccept}
        slotProps={{
          textField: {
            helperText: props.helperText,
          },
        }}
        // renderInput={(params: any) => {
        //   const newParams = {
        //     ...params,
        //     error: props.error,
        //   };

        //   return (
        //     <TextField
        //       fullWidth
        //       helperText={props.helperText}
        //       required={props.required}
        //       disabled={props.disabled}
        //       onBlur={handleOnBlur}
        //       autoComplete={props.autoComplete}
        //       {...newParams}
        //     />
        //   );
        // }}
      />
    </LocalizationProvider>
  );
};

export default AppDatePicker;
