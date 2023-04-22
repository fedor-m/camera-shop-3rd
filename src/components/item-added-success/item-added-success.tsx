import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { setAddToBasketKeySwitched } from '../../store/cart-state/cart-state';

type ItemAddedSuccessProps = {
  openModalWindow?: (state: boolean) => void;
};

function ItemAddedSuccess({ openModalWindow }: ItemAddedSuccessProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { pathname, search } = useLocation();
  const isMainPage = pathname === (AppRoute.Catalogue);
  const handleExit = () => {
    dispatch(setAddToBasketKeySwitched(false));
    if (isMainPage) {
      openModalWindow && openModalWindow(false);
    }
  };
  return (
    <>
      <svg
        className="modal__icon"
        width="80"
        height="78"
        aria-hidden="true"
      >
        <use xlinkHref="#icon-success" />
      </svg>
      <div className="modal__buttons">
        <Link
          className="btn btn--transparent modal__btn"
          to={isMainPage ? `${pathname}${search}` : AppRoute.Catalogue}
          onClick={handleExit}
        >
          Продолжить покупки
        </Link>
        <Link
          className="btn btn--purple modal__btn modal__btn--fit-width"
          to={AppRoute.Cart}
          onClick={handleExit}
        >
          Перейти в корзину
        </Link>
      </div>
    </>
  );
}
export default ItemAddedSuccess;
