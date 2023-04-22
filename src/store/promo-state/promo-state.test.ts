import {promoState} from './promo-state';
import {fetchPromoAction} from './api-actions';
import {PromoState} from '../../types/state';
import {makeFakePromo} from '../../mocks/mocks';

const fakePromo = makeFakePromo();

describe('Reducer: offerProcess', () => {
  let state: PromoState;

  beforeEach(() => {
    state = {
      promo: null,
      isPromoLoading: false
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(promoState.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('Action: fetchPromoAction', () => {
    it('should update loading status to "true" if action pending', () => {
      expect(promoState.reducer(state, {type: fetchPromoAction.pending.type}))
        .toEqual({...state, isPromoLoading: true});
    });

    it('should update loading status to "false" and loaded offers if action fulfilled', () => {
      expect(promoState.reducer(state, {type: fetchPromoAction.fulfilled.type, payload: fakePromo}))
        .toEqual({...state, isPromoLoading: false, promo: fakePromo});
    });
  });
});
