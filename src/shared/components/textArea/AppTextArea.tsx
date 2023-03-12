import { ChangeEvent, FocusEvent, useEffect, useRef, useState } from "react";

import AppTextAreaProps from "./AppTextAreaProps";
import AppTextAreaStyled from "./styledComponents/AppTextAreaStyled";

const AppTextArea = (props: AppTextAreaProps) => {
  // References
  const isMounted = useRef(false);

  // State
  const [onChangeValue, setOnChangeValue] = useState<unknown>(props.value);

  // Other
  useEffect(() => {
    if (isMounted.current) {
      setOnChangeValue(props.value);
    } else {
      isMounted.current = true;
    }
  }, [props.value]);

  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setOnChangeValue(event.target.value);

    props.onChange?.(event);
  };

  const handleOnBlur = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    if (event.target.value === props.value) return;

    props.onBlur?.(event);
  };

  return (
    <AppTextAreaStyled
      {...props}
      value={onChangeValue}
      disabled={props.disabled}
      variant='outlined'
      multiline
      rows={!!props.rows ? props.rows : 1}
      autoComplete='off'
      placeholder={props.placeholder}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
    />
  );
};

export default AppTextArea;
