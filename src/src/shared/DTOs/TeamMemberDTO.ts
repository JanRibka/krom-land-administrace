import ImageModel from "shared/models/ImageModel";

export interface TeamMemberDTO {
  idHomeTeamMembers: number;
  name: string | null;
  description: string | null;
  delete: boolean | null;
  image: ImageModel | null;
}
