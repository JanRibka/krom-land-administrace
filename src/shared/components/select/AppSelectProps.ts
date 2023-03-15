import { SelectChangeEvent } from '@mui/material';

import IAppSelectMenuItem from './IAppSelectMenuItem';

export default interface AppSelectProps {
  name?: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  formHelperText?: string;
  data: IAppSelectMenuItem[];
  selectedItem: string;
  isLoading?: boolean;
  setSelectedItem?: React.Dispatch<React.SetStateAction<string>>;
  onChangeSelect?: (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => void;
  onBlurSelect?: (event: any) => void;
  onInputChange?: (event: any) => void;
}
