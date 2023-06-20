import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import SectionStyled from "./styledComponents/SectionStyled";

const Unauthorized = () => {
  return (
    <SectionStyled component='section'>
      <Box className='section-inner-wrapper'>
        <Typography variant='h2'>
          Pro zobrazení stránky nemáte dostatečná oprávnění
        </Typography>
        <Typography variant='h4'>Přejděte na jinou stránku</Typography>
      </Box>
    </SectionStyled>
  );
};

export default Unauthorized;
