import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const SectionTitleStyled = styled(Box)(
  ({ theme }) =>
    `
  margin-bottom: 40px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;

  & .title {
    font-size: 2rem;
    line-height: 1.235;
    letter-spacing: 0.00735em;
    text-align: center;
    text-align-last: center;
    color: ${theme.palette.secondary.main}
  }
`
);

export default SectionTitleStyled;
