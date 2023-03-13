import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const SectionStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: "20px",
  padding: "30px",
  boxShadow:
    "0px 0px 4px 0px rgb(0 0 0 / 20%), 0px 0px 5px 4px rgb(0 0 0 / 14%), 1px 0px 10px 1px rgb(0 0 0 / 12%)",

  ".sub-section-separator": {
    marginTop: "50px",
  },
}));

export default SectionStyled;
