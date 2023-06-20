import { useSelector } from "react-redux";
import AppSeo from "shared/components/seo/AppSeo";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectActions } from "shared/infrastructure/store/webParts/webPartsSlice";
import { nameof } from "shared/nameof";

import ActionsModel from "../models/ActionsModel";

interface IProps {
  disable: boolean;
}

const Seo = (props: IProps) => {
  // Store
  const actions = useSelector(selectActions);

  // Constants
  const { handleActionsUpdate } = useWebPartsSlice();

  // Other
  const handleTextFieldOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    handleActionsUpdate({ [name]: value });
  };

  return (
    <ErrorBoundary>
      <AppSeo
        nameTitile={nameof<ActionsModel>("Title")}
        nameDescription={nameof<ActionsModel>("Description")}
        valueTitle={actions.Title}
        valueDescription={actions.Description}
        disable={props.disable}
        handleTextFieldOnBlur={handleTextFieldOnBlur}
      />
    </ErrorBoundary>
  );
};

export default Seo;
