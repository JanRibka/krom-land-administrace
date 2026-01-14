interface AppTextFieldProps {
  name: string;
  value: string;
  label: string;
  fullWidth?: boolean;
  isLoading?: boolean;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: "off";
  className?: string;
  placeholder?: string;
  error?: boolean;
  formHelperText?: string;
  variant: "filled" | "outlined" | "standard";
  onChange?: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

export default AppTextFieldProps;
