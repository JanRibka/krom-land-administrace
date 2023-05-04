import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";

import FooterStyled from "./styledComponents/FooterStyled";

interface IProps {
  disabled: boolean;
  loading: boolean;
  handleSaveOnClick: () => void;
}

const Footer = (props: IProps) => {
  return (
    <FooterStyled component='footer'>
      <Box className='footer-inner-wrapper'>
        <Box>
          <LoadingButton
            variant='contained'
            color='secondary'
            disabled={props.disabled}
            onClick={props.handleSaveOnClick}
            loading={props.loading}
            startIcon={<SaveIcon />}
          >
            Uložit
          </LoadingButton>
        </Box>
      </Box>
    </FooterStyled>
  );
};

export default Footer;
