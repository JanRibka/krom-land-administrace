import KromLandService from "features/KromLandService";

import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";

import FooterStyled from "./styledComponents/FooterStyled";

interface IProps {
  paddingLeft: number;
}

const Footer = (props: IProps) => {
  // Store
  // const common = useSelector(selectCommon);

  // Constants
  const _kromLandService = new KromLandService();

  // Other
  const handleSaveOnClick = () => {
    _kromLandService.saveStore();
  };

  return (
    <FooterStyled
      component='footer'
      sx={{ paddingLeft: props.paddingLeft + "px" }}
    >
      <Box className='footer-inner-wrapper'>
        <Box>Není kompletní</Box>
        <Box>
          <LoadingButton
            variant='contained'
            color='secondary'
            // disabled={!common._dataLoaded}
            onClick={handleSaveOnClick}
          >
            Uložit
          </LoadingButton>
        </Box>
      </Box>
    </FooterStyled>
  );
};

export default Footer;
