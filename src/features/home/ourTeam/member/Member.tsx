import TeamMemberModel from "features/home/models/TeamMemberModel";
import KromLandService from "features/KromLandService";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import FileUpload from "shared/components/fileUpload/FileUpload";
import SectionSubTitle from "shared/components/sectionSubTitle/SectionSubTitle";
import AppTextField from "shared/components/textField/AppTextField";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectHome } from "shared/infrastructure/store/webParts/webPartsSlice";
import ImageModel from "shared/models/ImageModel";
import { nameof } from "shared/nameof";

import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

interface IProps {
  index: number;
  memberCount: number;
  name: string;
  text: string;
  image: ImageModel;
}

const Member = (props: IProps) => {
  // Store
  const home = useSelector(selectHome);

  // State
  //   const [index] = useState<number>(props.index);

  // Constants
  const _kromLandService = new KromLandService();
  const { handleHomeTeamMemberUpdate } = useWebPartsSlice();

  // Other
  const handleTextFieldOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    handleHomeTeamMemberUpdate({ [name]: value }, props.index);
  };

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
    console.log(props.index);
    handleHomeTeamMemberUpdate({ [name]: image }, props.index);
  };

  const handleOnAfterFileDelete = (name: string) => {
    handleHomeTeamMemberUpdate({ [name]: new ImageModel() }, props.index);
  };

  const handleOnFileSave = async (name: string) => {
    const teamMember = { ...home.TeamMembers[props.index] };
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
      handleHomeTeamMemberUpdate({ [name]: image }, props.index);
    }
  };

  const handleDeleteMemberOnClick = () => {
    handleHomeTeamMemberUpdate({ Delete: true }, props.index);
  };
  console.log(props.index);
  return (
    <Box>
      <Box className={props.index > 0 ? "sub-section-separator" : undefined}>
        <SectionSubTitle title={"Člen " + props.memberCount} />
        <Stack spacing={2} direction='column'>
          <FileUpload
            image={props.image}
            name={nameof<TeamMemberModel>("Image")}
            label='Ideální rozlišení obrázku 1268 x 500px. Max. velikost 1MB'
            supportedExtensions={["png", "jpg", "jpeg", "webp"]}
            newImageAlt={"Fotka člena " + props.memberCount}
            maxFileSize={1}
            onAfterFileUpload={handleOnAfterFileUpload}
            onAfterFileDelete={handleOnAfterFileDelete}
            onFileSave={handleOnFileSave}
          />

          <AppTextField
            name={nameof<TeamMemberModel>("Name")}
            label='Jméno'
            value={props.name}
            variant='outlined'
            fullWidth
            required
            autoComplete='off'
            onBlur={handleTextFieldOnBlur}
          />

          <AppTextField
            name={nameof<TeamMemberModel>("Text")}
            label='Popis'
            value={props.text}
            variant='outlined'
            fullWidth
            required
            autoComplete='off'
            onBlur={handleTextFieldOnBlur}
          />

          <Button
            color='secondary'
            variant='outlined'
            startIcon={<DeleteIcon />}
            onClick={handleDeleteMemberOnClick}
          >
            Odebrat člena
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Member;
