import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { Promo } from '../../types/promo';

export const getPromo = (state: State): Promo | null =>
  state[NameSpace.Promo].promo;
export const getPromoLoadingStatus = (state: State): boolean =>
  state[NameSpace.Promo].isPromoLoading;
