import ActionsDTO from "./ActionsDTO";
import ContactDTO from "./ContactDTO";
import GalleryDTO from "./GalleryDTO";
import HomeDTO from "./HomeDTO";

export default class WebPartsDTO {
  Home: HomeDTO = new HomeDTO();
  Actions: ActionsDTO = new ActionsDTO();
  Gallery: GalleryDTO = new GalleryDTO();
  Contact: ContactDTO = new ContactDTO();

  public constructor(init?: Partial<WebPartsDTO>) {
    Object.assign(this, init);
  }
}
