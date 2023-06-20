import { useSelector } from "react-redux";
import AppSeo from "shared/components/seo/AppSeo";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectHome } from "shared/infrastructure/store/webParts/webPartsSlice";
import { nameof } from "shared/nameof";

import HomeModel from "../models/HomeModel";

interface IProps {
  disable: boolean;
}

const Seo = (props: IProps) => {
  // Store
  const home = useSelector(selectHome);

  // Constants
  const { handleHomeUpdate } = useWebPartsSlice();

  // Other
  const handleTextFieldOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    handleHomeUpdate({ [name]: value });
  };

  return (
    <ErrorBoundary>
      <AppSeo
        nameTitile={nameof<HomeModel>("Title")}
        nameDescription={nameof<HomeModel>("Description")}
        valueTitle={home.Title}
        valueDescription={home.Description}
        disable={props.disable}
        handleTextFieldOnBlur={handleTextFieldOnBlur}
      />
    </ErrorBoundary>
  );
};

export default Seo;
