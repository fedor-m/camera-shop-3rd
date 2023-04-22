import { Review } from './review';
export type ReviewPost = Omit<Review, 'id' | 'createAt'>;
