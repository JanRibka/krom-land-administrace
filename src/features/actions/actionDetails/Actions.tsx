import SectionStyled from 'features/styledComponents/SectionStyled';
import SectionSubTitle from 'shared/components/sectionSubTitle/SectionSubTitle';
import SectionTitle from 'shared/components/sectionTitle/SectionTitle';
import ErrorBoundary from 'shared/infrastructure/ErrorBoundary';

import Box from '@mui/material/Box';

import Action from './action/Action';

const ActionDetails = () => {
  return (
    <ErrorBoundary>
      <SectionStyled component='section'>
        <SectionTitle title='Akce' />
        {/* First action */}
        <SectionSubTitle title='První akce' />
        <Action index={0} />
        {/* Second action */}
        <Box className='sub-section-separator'>
          <SectionSubTitle title='Druhá akce' />
          <Action index={1} />
        </Box>
        {/* Third action */}
        <Box className='sub-section-separator'>
          <SectionSubTitle title='Třetí akce' />
          <Action index={2} />
        </Box>
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default ActionDetails;
