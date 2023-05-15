import Box from "@mui/system/Box";
import styled from "@mui/system/styled";

const TableFilterDateStyled = styled(Box)(({ theme }) => ({
  marginBottom: "15px",

  "& > .MuiStack-root": {
    justifyContent: "end",
  },
}));

export default TableFilterDateStyled;
