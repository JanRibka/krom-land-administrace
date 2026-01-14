import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const SectionSubTitleStyled = styled(Box)(
  ({ theme }) =>
    `
  margin-bottom: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;

  & .title {
    font-size: 1.5rem;
    line-height: 1.235;
    letter-spacing: 0.00735em;
    text-align: center;
    text-align-last: center;
    font-weight: 300;
    color: ${theme.palette.text.primary}
  }
`
);

export default SectionSubTitleStyled;
