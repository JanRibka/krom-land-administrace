import SectionStyled from "features/styledComponents/SectionStyled";
import { useSelector } from "react-redux";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import AppTextField from "shared/components/textField/AppTextField";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectContact } from "shared/infrastructure/store/webParts/webPartsSlice";
import { nameof } from "shared/nameof";

import { ContactModel } from "../models/ContactModel";

const Email = () => {
  // Contact
  const contact = useSelector(selectContact);
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
        <SectionTitle title='Email pro poslání zprávy' />
        <AppTextField
          name={nameof<ContactModel>("Email")}
          label='Email'
          value={contact.Email}
          variant='outlined'
          fullWidth
          required
          autoComplete='off'
          onBlur={handleTextFieldOnBlur}
        />
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default Email;
