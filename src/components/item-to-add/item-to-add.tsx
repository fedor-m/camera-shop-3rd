import { CameraCategory, LocalStorageParameter } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import {
  addItemToCart,
  setAddToBasketKeySwitched
} from '../../store/cart-state/cart-state';
import { Camera } from '../../types/camera';
import {
  addCameraToCart,
  getBookedCamerasFromLocalStorage
} from '../../utils';

type ItemToAddProps = {
  camera: Camera;
};

function ItemToAdd({ camera }: ItemToAddProps): JSX.Element {
  const {
    name,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    vendorCode,
    type,
    category,
    level,
    price
  } = camera;
  const dispatch = useAppDispatch();
  const handleAddItemToBasket = () => {
    localStorage.setItem(LocalStorageParameter.BookedCameras,
      JSON.stringify(addCameraToCart(
        getBookedCamerasFromLocalStorage(),
        camera)
      )
    );
    dispatch(addItemToCart(camera));
    dispatch(setAddToBasketKeySwitched(true));
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
          <p className="basket-item__price">
            <span className="visually-hidden">Цена:</span>
            {price.toLocaleString()}&nbsp;₽
          </p>
        </div>
      </div>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          onClick={handleAddItemToBasket}
        >
          <svg
            width="24"
            height="16"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-add-basket"></use>
          </svg>
          Добавить в корзину
        </button>
      </div>
    </>
  );
}
export default ItemToAdd;
