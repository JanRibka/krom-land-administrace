export default class TeamMemberDTO {
  Image: string = "";
  Name: string = "";
  Text: string = "";

  public constructor(init?: Partial<TeamMemberDTO>) {
    Object.assign(this, init);
  }
}
