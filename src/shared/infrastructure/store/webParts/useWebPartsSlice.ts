import ActionDetailModel from "features/webParts/actions/models/ActionDetailModel";
import ActionsModel from "features/webParts/actions/models/ActionsModel";
import DocumentToDownloadModel from "features/webParts/actions/models/DocumentToDownloadModel";
import { ContactModel } from "features/webParts/contact/models/ContactModel";
import GalleryImageModel from "features/webParts/gallery/models/GalleryImageModel";
import GalleryModel from "features/webParts/gallery/models/GalleryModel";
import HomeModel from "features/webParts/home/models/HomeModel";
import TeamMemberModel from "features/webParts/home/models/TeamMemberModel";
import { useDispatch } from "react-redux";
import ConditionsModel from "shared/models/ConditionsModel";
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

  const handleGalleryGalleryImageRemove = (index: number) => {
    dispatch(actions.galleryGalleryImageRemove(index));
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

  const handleConditionsUpdate = (conditions: Partial<ConditionsModel>) => {
    dispatch(actions.conditionsUpdate(conditions));
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
    handleGalleryGalleryImageRemove,
    handleContactUpdate,
    handleContactImageUpdate,
    handleConditionsUpdate,
  };
};
