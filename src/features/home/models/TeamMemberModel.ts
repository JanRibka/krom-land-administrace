import ImageModel from "shared/models/ImageModel";

export default class TeamMemberModel {
  Id: number = 0;
  Image: ImageModel = new ImageModel();
  Name: string = "";
  Text: string = "";
  Delete: boolean = false;

  public constructor(init?: Partial<TeamMemberModel>) {
    Object.assign(this, init);
  }
}
