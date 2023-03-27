import ActionDetailModel from "features/actions/models/ActionDetailModel";
import ActionsModel from "features/actions/models/ActionsModel";
import DocumentToDownloadModel from "features/actions/models/DocumentToDownloadModel";
import { ContactModel } from "features/contact/models/ContactModel";
import GalleryImageModel from "features/gallery/models/GalleryImageModel";
import GalleryModel from "features/gallery/models/GalleryModel";
import HomeModel from "features/home/models/HomeModel";
import TeamMemberModel from "features/home/models/TeamMemberModel";
import { useDispatch } from "react-redux";
import ImageModel from "shared/models/ImageModel";
import ActionsImageType from "shared/types/ActionsImageType";
import ContactImageType from "shared/types/ContactImageType";
import GalleryImageType from "shared/types/GalleryImageType";
import HomeImageType from "shared/types/HomeImageType";

import { actions, WebPartsState } from "./webPartsSlice";

export const useWebPartsSlice = () => {
  const dispatch = useDispatch();

  const handleWebPartsUpdate = (webParts: Partial<WebPartsState>) => {
    dispatch(actions.webPartsUpdate(webParts));
  };

  const handleHomeUpdate = (home: Partial<HomeModel>) => {
    dispatch(actions.homeUpdate(home));
  };

  const handleHomeImageUpdate = (
    name: HomeImageType,
    image: Partial<ImageModel>
  ) => {
    dispatch(actions.homeImageUpdate({ name, image }));
  };

  const handleHomeTeamMemberAdd = () => {
    dispatch(actions.homeTeamMemberAdd());
  };

  const handleHomeTeamMemberUpdate = (
    member: Partial<TeamMemberModel>,
    index: number
  ) => {
    dispatch(actions.homeTeamMemberUpdate({ member, index }));
  };

  const handleActionsUpdate = (actionsData: Partial<ActionsModel>) => {
    dispatch(actions.actionsUpdate(actionsData));
  };

  const handleActionsImageUpdate = (
    name: ActionsImageType,
    image: Partial<ImageModel>
  ) => {
    dispatch(actions.actionsImageUpdate({ name, image }));
  };

  const handleActionUpdate = (
    action: Partial<ActionDetailModel>,
    index: number
  ) => {
    dispatch(actions.actionUpdate({ actionDetail: action, index }));
  };

  const handleActionsDocumentAdd = () => {
    dispatch(actions.actionsDocumentAdd());
  };

  const handleActionsDocumentUpdate = (
    document: Partial<DocumentToDownloadModel>,
    index: number
  ) => {
    dispatch(actions.actionsDocumentUpadate({ document, index }));
  };

  const handleGalleryUpdate = (gallery: Partial<GalleryModel>) => {
    dispatch(actions.galleryUpdate(gallery));
  };

  const handleGalleryMainImageUpdate = (
    name: GalleryImageType,
    image: Partial<ImageModel>
  ) => {
    dispatch(actions.galleryMainImageUpdate({ name, image }));
  };

  const handleGalleryImageAdd = () => {
    dispatch(actions.galleryImageAdd());
  };

  const handleGalleryGalleryImageUpdate = (
    image: Partial<GalleryImageModel>,
    index: number
  ) => {
    dispatch(actions.galleryGalleryImageUpadate({ image, index }));
  };

  const handleContactUpdate = (contact: Partial<ContactModel>) => {
    dispatch(actions.contactUpdate(contact));
  };

  const handleContactImageUpdate = (
    name: ContactImageType,
    image: Partial<ImageModel>
  ) => {
    dispatch(actions.contactImageUpdate({ name, image }));
  };

  return {
    handleWebPartsUpdate,
    handleHomeUpdate,
    handleHomeImageUpdate,
    handleHomeTeamMemberAdd,
    handleHomeTeamMemberUpdate,
    handleActionsUpdate,
    handleActionsImageUpdate,
    handleActionUpdate,
    handleActionsDocumentAdd,
    handleActionsDocumentUpdate,
    handleGalleryUpdate,
    handleGalleryMainImageUpdate,
    handleGalleryImageAdd,
    handleGalleryGalleryImageUpdate,
    handleContactUpdate,
    handleContactImageUpdate,
  };
};
