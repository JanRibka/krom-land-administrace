export default class TeamMemberDTO {
  Id: number | null = null;
  Image: string | null = null;
  Name: string | null = null;
  Description: string | null = null;
  Delete: boolean | null = null;

  public constructor(init?: Partial<TeamMemberDTO>) {
    Object.assign(this, init);
  }
}
