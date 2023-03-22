import { CheckboxProps, FormGroupProps } from "@mui/material";

export default interface AppCheckboxProps extends CheckboxProps {
  label: string | number | React.ReactElement;
  useFormGroup?: boolean;
  formGroupProps?: FormGroupProps;
  error?: boolean;
}
