import FormGroup from "@mui/material/FormGroup";
import { styled } from "@mui/material/styles";

const FormGroupStyled = styled(FormGroup)(({ theme }) => ({
  label: {
    marginLeft: 0,
    marginBottom: 0,
  },
}));

export default FormGroupStyled;
