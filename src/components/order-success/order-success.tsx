import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function OrderSuccess(): JSX.Element {
  return (
    <>
      <svg
        className="modal__icon"
        width="80"
        height="78"
        aria-hidden="true"
      >
        <use xlinkHref="#icon-review-success" />
      </svg>
      <div className="modal__buttons">
        <Link
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          to={AppRoute.Catalogue}
        >Вернуться к покупкам
        </Link>
      </div>
    </>
  );
}
export default OrderSuccess;
