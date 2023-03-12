import { ChangeEvent, FocusEvent } from "react";

interface AppTextAreaProps {
  name: string;
  value: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  rows?: number;
  maxLength?: number;
  formHelperText?: string;
  fullWidth?: boolean;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
}

export default AppTextAreaProps;
