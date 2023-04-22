import { Promo } from './promo';
export type Camera = Promo & {
  vendorCode: string;
  type: string;
  category: string;
  description: string;
  level: string;
  rating: number;
  price: number;
  reviewCount: number;
}
