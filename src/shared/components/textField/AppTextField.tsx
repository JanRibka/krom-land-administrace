import React, { forwardRef, Ref, useEffect, useRef, useState } from 'react';

import { CircularProgress, InputAdornment } from '@mui/material';

import AppTextFieldProps from './AppTextFieldProps';
import AppTextFieldStyled from './styledComponents/AppTextFieldStyled';

const AppTextField = forwardRef(
  (props: AppTextFieldProps, ref: Ref<HTMLInputElement>) => {
    const isMounted = useRef(false);

    const disabled = props.disabled || props.isLoading;

    const [onChangeValue, setOnChangeValue] = useState<unknown>(props.value);

    useEffect(() => {
      if (isMounted.current) {
        setOnChangeValue(props.value);
      } else {
        isMounted.current = true;
      }
    }, [props.value]);

    const handleOnChange = (
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      setOnChangeValue(e.target.value);

      props.onChange?.(e);
    };

    const handleOnBlur = (
      e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>
    ) => {
      if (e.target.value === props.value) return;

      props.onBlur?.(e);
    };

    return (
      <AppTextFieldStyled
        {...props}
        ref={ref}
        value={onChangeValue}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        disabled={disabled}
        InputProps={{
          endAdornment: props.isLoading ? (
            <InputAdornment position='end'>
              <CircularProgress size={25} />
            </InputAdornment>
          ) : undefined,
        }}
      />
    );
  }
);

export default AppTextField;
