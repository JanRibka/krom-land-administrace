import SectionStyled from "features/styledComponents/SectionStyled";
import { useSelector } from "react-redux";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import AppTextField from "shared/components/textField/AppTextField";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectContact } from "shared/infrastructure/store/webParts/webPartsSlice";
import { nameof } from "shared/nameof";

import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import Box from "@mui/material/Box";

import { ContactModel } from "../models/ContactModel";

const GoogleMaps = () => {
  // Store
  const contact = useSelector(selectContact);

  // Constants
  const { handleContactUpdate } = useWebPartsSlice();

  // Other
  const handleTextFieldOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    handleContactUpdate({ [name]: value });
  };

  return (
    <ErrorBoundary>
      <SectionStyled component='section'>
        <SectionTitle title='Google mapa' />
        <Box className='item-wrapper'>
          <AppTextField
            name={nameof<ContactModel>("GoogleMapsUrl")}
            label='Url'
            value={contact.GoogleMapsUrl}
            variant='outlined'
            fullWidth
            required
            autoComplete='off'
            onBlur={handleTextFieldOnBlur}
          />
          <HelpCenterOutlinedIcon titleAccess='Odkaz pro google mapy lze získat tak, že na google mapách klikneš na daný špendlík a poté vybereš sdílet. Otevře se okno pro sdílení, kde vybereš vložení mapy, kde je daný odkaz. Odkaz je potřeba vložit bez iframe. Odkaz začíná za první uvozovkou, kde je https a končí následující uvozovkou. Odkaz se kopíruje bez uvozovek ' />
        </Box>
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default GoogleMaps;
