import { CouponPost } from './coupon-post';

export type OrderPost= CouponPost & {
  camerasIds: number[];
}
