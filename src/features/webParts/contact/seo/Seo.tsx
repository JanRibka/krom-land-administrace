import { useSelector } from "react-redux";
import AppSeo from "shared/components/seo/AppSeo";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectContact } from "shared/infrastructure/store/webParts/webPartsSlice";
import { nameof } from "shared/nameof";

import { ContactModel } from "../models/ContactModel";

interface IProps {
  disable: boolean;
}

const Seo = (props: IProps) => {
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
      <AppSeo
        nameTitile={nameof<ContactModel>("Title")}
        nameDescription={nameof<ContactModel>("Description")}
        valueTitle={contact.Title}
        valueDescription={contact.Description}
        disable={props.disable}
        handleTextFieldOnBlur={handleTextFieldOnBlur}
      />
    </ErrorBoundary>
  );
};

export default Seo;
