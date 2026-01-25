export interface News {
  idHomeNews: number | null;
  title: string;
  content: string;
  createdAt: Date | null;
  delete: boolean;
}
