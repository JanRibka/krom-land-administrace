import ActionDetailModel from "features/actions/models/ActionDetailModel";
import ActionsModel from "features/actions/models/ActionsModel";
import { ContactModel } from "features/contact/models/ContactModel";
import GalleryModel from "features/gallery/models/GalleryModel";
import HomeModel from "features/home/models/HomeModel";
import { useDispatch } from "react-redux";

import { actions, WebPartsState } from "./webPartsSlice";

export const useWebPartsSlice = () => {
  const dispatch = useDispatch();

  const handleWebPartsUpdate = (webParts: Partial<WebPartsState>) => {
    dispatch(actions.webPartsUpdate(webParts));
  };

  const handleHomeUpdate = (home: Partial<HomeModel>) => {
    dispatch(actions.homeUpdate(home));
  };

  const handleActionsUpdate = (actionsData: Partial<ActionsModel>) => {
    dispatch(actions.actionsUpdate(actionsData));
  };

  const handleActionUpdate = (
    action: Partial<ActionDetailModel>,
    index: number
  ) => {
    dispatch(actions.actionUpdate({ actionDetail: action, index }));
  };

  const handleGalleryUpdate = (gallery: Partial<GalleryModel>) => {
    dispatch(actions.galleryUpdate(gallery));
  };

  const handleContactUpdate = (contact: Partial<ContactModel>) => {
    dispatch(actions.contactUpdate(contact));
  };

  return {
    handleWebPartsUpdate,
    handleHomeUpdate,
    handleActionsUpdate,
    handleActionUpdate,
    handleGalleryUpdate,
    handleContactUpdate,
  };
};
