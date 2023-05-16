import 'dayjs/locale/cs';

import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import AppDatePickerStyled from './styledComponents/AppDatePickerStyled';

interface IProps {
  label: string;
  value: Date | null;
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
  const [value, setValue] = useState<Dayjs | null>(null);

  useEffect(() => {
    setValue(dayjs(props.value));
  }, [props.value]);

  const handleOnBlur = (
    e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>
  ) => {
    console.log(value);
    if (!value) return;
    props.onChange(props.name, value?.toDate());
  };

  const handleOnAccept = (val: unknown) => {
    const newValue = val as Dayjs;
    console.log(newValue);
    if (!newValue) return;

    props.onChange(props.name, newValue?.toDate());
  };

  const handleOnChange = (val: unknown) => {
    const newValue = val as Dayjs;
    // let date = newValue?.toDate();
    console.log(newValue);
    // date = addTimeZoneOffset(date);
    // setValue(dayjs(date));
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='cs'>
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
            fullWidth: true,
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
