export const apiTags = {
  "": "",
} as const;

export type ApiTags = (typeof apiTags)[keyof typeof apiTags];
export const apiTagList: ApiTags[] = Object.values(apiTags);
