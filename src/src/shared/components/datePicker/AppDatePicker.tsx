import "dayjs/locale/cs";
import cs from "dayjs/locale/cs";

import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import AppDatePickerStyled from "./styledComponents/AppDatePickerStyled";

interface IProps {
  label: string;
  value: Date | null;
  name: string;
  error?: boolean;
  helperText?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: "off";
  fullWidth?: boolean;
  onChange: (
    name: string,
    date: Date | null,
    keyboardInputValue?: string
  ) => void;
}

const AppDatePicker = (props: IProps) => {
  dayjs.locale(cs);

  const [value, setValue] = useState<Dayjs | null>(null);

  useEffect(() => {
    setValue(dayjs(props.value));
  }, [props.value]);

  const handleOnBlur = (
    e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>
  ) => {
    // if (!value) return;

    props.onChange(props.name, value?.toDate() ?? null);
  };

  const handleOnAccept = (val: unknown) => {
    const newValue = val as Dayjs;
    if (!newValue) return;

    props.onChange(props.name, newValue?.toDate());
  };

  const handleOnChange = (val: unknown) => {
    const newValue = val as Dayjs;

    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs">
      <AppDatePickerStyled
        label={props.label}
        minDate={dayjs("0001-01-01")}
        // maxDate={dayjs("2099-12-31")}
        value={value}
        disabled={props.disabled}
        onChange={handleOnChange}
        onAccept={handleOnAccept}
        slotProps={{
          textField: {
            fullWidth: props.fullWidth,
            error: props.error,
            helperText: props.helperText,
            onBlur: handleOnBlur,
            autoComplete: props.autoComplete,
            disabled: props.disabled,
            required: props.required,
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default AppDatePicker;
