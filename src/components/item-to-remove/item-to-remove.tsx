import { Link } from 'react-router-dom';
import { AppRoute, CameraCategory } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import {
  getBookedCamerasFromLocalStorage,
  removeCameraFromCart
} from '../../utils';
import { removeItemFromCart } from '../../store/cart-state/cart-state';
import { Camera } from '../../types/camera';

type ItemToRemoveProps = {
  camera: Camera;
  openModalWindow: (state: boolean) => void;
};

function ItemToRemove({ camera, openModalWindow }: ItemToRemoveProps): JSX.Element {
  const {
    id,
    name,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    vendorCode,
    type,
    category,
    level
  } = camera;
  const dispatch = useAppDispatch();
  const handleRemoveItemFromCart = () => {
    removeCameraFromCart(getBookedCamerasFromLocalStorage(), id);
    dispatch(removeItemFromCart(id));
    openModalWindow(false);
  };
  const handleContinueShopping = () => {
    openModalWindow(false);
  };
  return (
    <>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source
              type="image/webp"
              srcSet={`/${previewImgWebp}, /${previewImgWebp2x}`}
            />
            <img
              src={`/${previewImg}`}
              srcSet={`/${previewImg2x}`}
              width="140"
              height="120"
              alt={name}
            />
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{name}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item">
              <span className="basket-item__article">Артикул:</span>
              &nbsp;
              <span className="basket-item__number">{vendorCode}</span>
            </li>
            <li className="basket-item__list-item">
              {type}&nbsp;{
                category === CameraCategory.Photocamera
                  ?
                  CameraCategory.Photo.toLocaleLowerCase()
                  :
                  category.toLocaleLowerCase()
              }
            </li>
            <li className="basket-item__list-item">
              {level}&nbsp;уровень
            </li>
          </ul>
        </div>
      </div>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--half-width"
          type="button"
          onClick={handleRemoveItemFromCart}
        >
          Удалить
        </button>
        <Link
          className="btn btn--transparent modal__btn modal__btn--half-width"
          to={AppRoute.Cart}
          onClick={handleContinueShopping}
        >
          Продолжить покупки
        </Link>
      </div>
    </>
  );
}
export default ItemToRemove;
