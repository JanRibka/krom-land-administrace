import SectionStyled from "features/styledComponents/SectionStyled";
import { useSelector } from "react-redux";
import FileUpload from "shared/components/fileUpload/FileUpload";
import SectionSubTitle from "shared/components/sectionSubTitle/SectionSubTitle";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectHome } from "shared/infrastructure/store/webParts/webPartsSlice";
import ImageModel from "shared/models/ImageModel";
import { nameof } from "shared/nameof";
import { v4 as uuidv4 } from "uuid";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import TeamMemberModel from "../models/TeamMemberModel";
import ButtonWrapperStyled from "./styledComponents/ButtonWrapperStyled";

const OurTeam = () => {
  // Store
  const home = useSelector(selectHome);

  // Constants
  const { handleHomeTeamMemberAdd } = useWebPartsSlice();

  // Other
  const handleOnAfterFileUpload = (
    fileName: string,
    name: string,
    alt: string,
    destination: string
  ) => {
    const image = new ImageModel({
      Path: (process.env.PUBLIC_URL ?? "") + destination + fileName,
      Alt: alt,
      Name: fileName,
    });

    // handleHomeUpdate({ [name]: image });
  };

  const handleOnAfterFileDelete = (name: string) => {
    // handleHomeImageUpdate(name as HomeImageType, new ImageModel());
  };

  const handleOnFileSave = async (name: string) => {
    // let image: ImageModel = home[name as HomeImageType] as ImageModel;
    // image = {
    //   ...image,
    //   Path: (process.env.REACT_APP_WEB_PUBLIC_IMG_URL ?? "") + image.Name,
    // };
    // const result = await _kromLandService.saveImageHome(image, name);
    // if (result) {
    //   handleHomeImageUpdate(name as HomeImageType, {
    //     Path: (process.env.REACT_APP_WEB_PUBLIC_IMG_URL ?? "") + image.Name,
    //   });
    // }
  };

  const handleAddMemberOnClick = () => {
    handleHomeTeamMemberAdd();
  };

  const renderMembers = () => {
    const teamMembers: TeamMemberModel[] = [...home.TeamMembers];

    return teamMembers.map((member, index) => {
      return (
        <Box key={"teamMember_" + uuidv4()}>
          <Box className={index > 0 ? "sub-section-separator" : undefined}>
            <SectionSubTitle title={"Člen " + (index + 1)} />

            <FileUpload
              image={member.Image}
              name={nameof<TeamMemberModel>("Image")}
              label='Ideální rozlišení obrázku 600 x 600px. Max. velikost 1MB'
              supportedExtensions={["png", "jpg", "jpeg"]}
              newImageAlt='Rodina je základ všeho | KROM Land'
              maxFileSize={1}
              onAfterFileUpload={handleOnAfterFileUpload}
              onAfterFileDelete={handleOnAfterFileDelete}
              onFileSave={handleOnFileSave}
            />
          </Box>
        </Box>
      );
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
