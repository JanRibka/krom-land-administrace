import { useSelector } from "react-redux";
import AppSeo from "shared/components/seo/AppSeo";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectGallery } from "shared/infrastructure/store/webParts/webPartsSlice";
import { nameof } from "shared/nameof";

import GalleryModel from "../models/GalleryModel";

interface IProps {
  disable: boolean;
}

const Seo = (props: IProps) => {
  // Store
  const gallery = useSelector(selectGallery);

  // Constants
  const { handleGalleryUpdate } = useWebPartsSlice();

  // Other
  const handleTextFieldOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    handleGalleryUpdate({ [name]: value });
  };

  return (
    <ErrorBoundary>
      <AppSeo
        nameTitile={nameof<GalleryModel>("Title")}
        nameDescription={nameof<GalleryModel>("Description")}
        valueTitle={gallery.Title}
        valueDescription={gallery.Description}
        disable={props.disable}
        handleTextFieldOnBlur={handleTextFieldOnBlur}
      />
    </ErrorBoundary>
  );
};

export default Seo;
