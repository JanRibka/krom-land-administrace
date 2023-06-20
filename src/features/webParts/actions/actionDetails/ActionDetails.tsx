import SectionStyled from "features/styledComponents/SectionStyled";
import SectionSubTitle from "shared/components/sectionSubTitle/SectionSubTitle";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";

import Box from "@mui/material/Box";

import Action from "./action/Action";

interface IProps {
  disable: boolean;
}

const ActionDetails = (props: IProps) => {
  return (
    <ErrorBoundary>
      <SectionStyled component='section'>
        <SectionTitle title='Akce' />
        {/* First action */}
        <SectionSubTitle title='První akce' />
        <Action index={0} disable={props.disable} />
        {/* Second action */}
        <Box className='sub-section-separator'>
          <SectionSubTitle title='Druhá akce' />
          <Action index={1} disable={props.disable} />
        </Box>
        {/* Third action */}
        <Box className='sub-section-separator'>
          <SectionSubTitle title='Třetí akce' />
          <Action index={2} disable={props.disable} />
        </Box>
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default ActionDetails;
