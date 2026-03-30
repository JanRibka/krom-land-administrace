export interface RentingItem {
  idRentingItem: number;
  name: string;
  code: string;
  isActive: boolean;
  price: number | null;
  remark?: string;
}
