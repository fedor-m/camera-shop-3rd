import { Pages } from './pages';
export type Url = Pages & {
  sort?: string | null;
  order?: string | null;
  priceGte?: number | null;
  priceLte?: number | null;
  category?: string | null;
  types? : string[] | null;
  levels?: string[] | null;
};
