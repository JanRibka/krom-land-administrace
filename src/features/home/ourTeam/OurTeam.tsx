import KromLandService from "features/KromLandService";
import SectionStyled from "features/styledComponents/SectionStyled";
import { useSelector } from "react-redux";
import FileUpload from "shared/components/fileUpload/FileUpload";
import SectionSubTitle from "shared/components/sectionSubTitle/SectionSubTitle";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import AppTextField from "shared/components/textField/AppTextField";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectHome } from "shared/infrastructure/store/webParts/webPartsSlice";
import ImageModel from "shared/models/ImageModel";
import { nameof } from "shared/nameof";
import { v4 as uuidv4 } from "uuid";

import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import TeamMemberModel from "../models/TeamMemberModel";
import ButtonWrapperStyled from "./styledComponents/ButtonWrapperStyled";

const OurTeam = () => {
  // Store
  const home = useSelector(selectHome);

  // Constants
  const _kromLandService = new KromLandService();
  const { handleHomeTeamMemberAdd, handleHomeTeamMemberUpdate } =
    useWebPartsSlice();

  // Other
  const handleTextFieldOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
    index: number
  ) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    handleHomeTeamMemberUpdate({ [name]: value }, index);
  };

  const handleOnAfterFileUpload = (
    fileName: string,
    name: string,
    alt: string,
    destination: string,
    index: number
  ) => {
    const image = new ImageModel({
      Path: (process.env.PUBLIC_URL ?? "") + destination + fileName,
      Alt: alt,
      Name: fileName,
    });

    handleHomeTeamMemberUpdate({ [name]: image }, index);
  };

  const handleOnAfterFileDelete = (name: string, index: number) => {
    handleHomeTeamMemberUpdate({ [name]: new ImageModel() }, index);
  };

  const handleOnFileSave = async (name: string, index: number) => {
    const teamMember = { ...home.TeamMembers[index] };
    let image = { ...teamMember.Image };

    image = {
      ...image,
      Path: (process.env.REACT_APP_WEB_PUBLIC_IMG_URL ?? "") + image.Name,
    };

    const result = await _kromLandService.saveImageTeamMember(
      image,
      teamMember.Id
    );

    if (result) {
      handleHomeTeamMemberUpdate({ [name]: image }, index);
    }
  };

  const handleAddMemberOnClick = () => {
    handleHomeTeamMemberAdd();
  };

  const handleDeleteMemberOnClick = (index: number) => {
    handleHomeTeamMemberUpdate({ Delete: true }, index);
  };

  const renderMembers = () => {
    let teamMembers: TeamMemberModel[] = [...home.TeamMembers];
    let memberCount = 0;

    return teamMembers.map((member, index) => {
      if (!member.Delete) {
        memberCount += 1;

        return (
          <Box key={"teamMember_" + uuidv4()}>
            <Box className={index > 0 ? "sub-section-separator" : undefined}>
              <SectionSubTitle title={"Člen " + memberCount} />
              <Stack spacing={2} direction='column'>
                <FileUpload
                  image={member.Image}
                  name={nameof<TeamMemberModel>("Image")}
                  label='Ideální rozlišení obrázku 1268 x 500px. Max. velikost 1MB'
                  supportedExtensions={["png", "jpg", "jpeg", "webp"]}
                  newImageAlt={"Fotka člena " + memberCount}
                  maxFileSize={1}
                  onAfterFileUpload={(fileName, name, alt, destination) =>
                    handleOnAfterFileUpload(
                      fileName,
                      name,
                      alt,
                      destination,
                      index
                    )
                  }
                  onAfterFileDelete={(name) =>
                    handleOnAfterFileDelete(name, index)
                  }
                  onFileSave={(name) => handleOnFileSave(name, index)}
                />

                <AppTextField
                  name={nameof<TeamMemberModel>("Name")}
                  label='Jméno'
                  value={member.Name}
                  variant='outlined'
                  fullWidth
                  required
                  autoComplete='off'
                  onBlur={(e) => handleTextFieldOnBlur(e, index)}
                />

                <AppTextField
                  name={nameof<TeamMemberModel>("Text")}
                  label='Popis'
                  value={member.Text}
                  variant='outlined'
                  fullWidth
                  required
                  autoComplete='off'
                  onBlur={(e) => handleTextFieldOnBlur(e, index)}
                />

                <Button
                  color='secondary'
                  variant='outlined'
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteMemberOnClick(index)}
                >
                  Odebrat člena
                </Button>
              </Stack>
            </Box>
          </Box>
        );
      } else {
        return undefined;
      }
    });
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
