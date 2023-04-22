import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import HistoryRouter from './components/history-router/history-router';
import browserHistory from './browser-history';
import { store } from './store/store';
import { fetchPromoAction } from './store/promo-state/api-actions';
import {
  setCart,
  setDiscount,
  setCoupon,
  setDiscountFormBlocked
} from './store/cart-state/cart-state';
import { getBookedCamerasFromLocalStorage, isDiscountCorrect, isPromoCodeCorrect } from './utils';
import App from './components/app/app';
import { LocalStorageParameter } from './const';


store.dispatch(fetchPromoAction());
store.dispatch(setCart(getBookedCamerasFromLocalStorage()));
store.dispatch(
  setDiscount(
    Number(localStorage.getItem(LocalStorageParameter.Discount))
  )
);
store.dispatch(
  setCoupon(
    (localStorage.getItem(LocalStorageParameter.Coupon)) || ''
  )
);
if (
  isPromoCodeCorrect(
    String(localStorage.getItem(LocalStorageParameter.Coupon))
  )
  &&
  isDiscountCorrect(
    Number(localStorage.getItem(LocalStorageParameter.Discount))
  )
) {
  store.dispatch(setDiscountFormBlocked());
}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
