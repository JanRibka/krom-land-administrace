import { useTranslation } from "react-i18next";

import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";

import FooterStyled from "./styledComponents/FooterStyled";

interface IProps {
  paddingLeft: number;
}

const Footer = (props: IProps) => {
  // Consts
  const { t } = useTranslation(["layout\\footer"]);

  return (
    <FooterStyled
      component='footer'
      sx={{ paddingLeft: props.paddingLeft + "px" }}
    >
      <Box className='footer-inner-wrapper'>
        <Box>Není kompletní</Box>
        <Box>
          <LoadingButton variant='contained' color='secondary'>
            {t("save")}
          </LoadingButton>
        </Box>
      </Box>
    </FooterStyled>
  );
};

export default Footer;
