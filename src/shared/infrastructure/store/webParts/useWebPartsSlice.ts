import ActionDetailModel from 'features/actions/models/ActionDetailModel';
import ActionsModel from 'features/actions/models/ActionsModel';
import { ContactModel } from 'features/contact/models/ContactModel';
import GalleryModel from 'features/gallery/models/GalleryModel';
import HomeModel from 'features/home/models/HomeModel';
import TeamMemberModel from 'features/home/models/TeamMemberModel';
import { useDispatch } from 'react-redux';
import ImageModel from 'shared/models/ImageModel';
import ActionsImageType from 'shared/types/ActionsImageType';
import ContactImageType from 'shared/types/ContactImageType';
import GalleryImageType from 'shared/types/GalleryImageType';
import HomeImageType from 'shared/types/HomeImageType';

import { actions, WebPartsState } from './webPartsSlice';

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

  const handleGalleryUpdate = (gallery: Partial<GalleryModel>) => {
    dispatch(actions.galleryUpdate(gallery));
  };

  const handleGalleryImageUpdate = (
    name: GalleryImageType,
    image: Partial<ImageModel>
  ) => {
    dispatch(actions.galleryImageUpdate({ name, image }));
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
    handleGalleryUpdate,
    handleGalleryImageUpdate,
    handleContactUpdate,
    handleContactImageUpdate,
  };
};
