import HomeDTO from "./HomeDTO";

export default class WebPartsDTO {
  Home: HomeDTO = new HomeDTO();

  public constructor(init?: Partial<WebPartsDTO>) {
    Object.assign(this, init);
  }
}
