import SectionStyled from 'features/styledComponents/SectionStyled';
import { useSelector } from 'react-redux';
import SectionTitle from 'shared/components/sectionTitle/SectionTitle';
import ErrorBoundary from 'shared/infrastructure/ErrorBoundary';
import { useWebPartsSlice } from 'shared/infrastructure/store/webParts/useWebPartsSlice';
import { selectHome } from 'shared/infrastructure/store/webParts/webPartsSlice';
import { v4 as uuidv4 } from 'uuid';

import Button from '@mui/material/Button';

import TeamMemberModel from '../models/TeamMemberModel';
import Member from './member/Member';
import ButtonWrapperStyled from './styledComponents/ButtonWrapperStyled';

const OurTeam = () => {
  // Store
  const home = useSelector(selectHome);

  // Constants
  const { handleHomeTeamMemberAdd } = useWebPartsSlice();

  // Other
  const handleAddMemberOnClick = () => {
    handleHomeTeamMemberAdd();
  };

  const renderMembers = () => {
    let teamMembers: TeamMemberModel[] = [...home.TeamMembers];
    let memberCount = 0;
    let result: JSX.Element[] = [];

    teamMembers.forEach((member, index) => {
      if (!member.Delete) {
        memberCount += 1;

        result.push(
          <Member
            key={"teamMember_" + uuidv4()}
            index={index}
            memberCount={memberCount}
            name={member.Name}
            text={member.Text}
            image={member.Image}
          />
        );
      }
    });

    return result;
  };

  return (
    <ErrorBoundary>
      <SectionStyled component='section'>
        <SectionTitle title='Náš tým' />

        {renderMembers()}

        <ButtonWrapperStyled>
          <Button
            onClick={handleAddMemberOnClick}
            color='secondary'
            variant='contained'
          >
            Přidat člena
          </Button>
        </ButtonWrapperStyled>
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default OurTeam;
