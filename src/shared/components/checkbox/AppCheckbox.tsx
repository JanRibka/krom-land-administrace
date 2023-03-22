import { Checkbox, FormControl } from '@mui/material';

import AppCheckboxProps from './AppCheckboxProps';
import AppCheckoboxStyled from './styledComponents/AppCheckboxStyled';
import FormGroupStyled from './styledComponents/FormGroupStyled';

const AppCheckbox = (props: AppCheckboxProps) => {
  const { label, useFormGroup, formGroupProps, error, ...checkboxProps } =
    props;

  const render = () => {
    if (props.useFormGroup) return renderFormGroupCheckbox();

    return renderCheckbox();
  };

  const renderCheckbox = () => {
    return (
      <AppCheckoboxStyled
        control={<Checkbox {...checkboxProps} />}
        label={props.label}
      />
    );
  };

  const renderFormGroupCheckbox = () => {
    return (
      <FormGroupStyled {...props.formGroupProps}>
        {renderCheckbox()}
      </FormGroupStyled>
    );
  };

  return (
    <FormControl
      error={error}
      sx={{
        ".MuiFormControlLabel-root.Mui-error": {
          // svg: {

          //   color: "rgb(211, 47, 47)",

          // },

          ".MuiTypography-root": {
            color: "rgb(211, 47, 47)",
          },
        },
      }}
    >
      {render()}
    </FormControl>
  );
};

AppCheckbox.defaultProps = {
  useFormGroup: true,
};

export default AppCheckbox;
