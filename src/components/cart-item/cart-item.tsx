import {
  useState,
  ChangeEvent,
  KeyboardEvent
} from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import {
  setTempCamera,
  increaseItemCountInCart,
  decreaseItemCountInCart,
  setItemCountInCart
} from '../../store/cart-state/cart-state';
import { BookedCamera } from '../../types/booked-camera';
import {
  getBookedCamerasFromLocalStorage,
  addCameraToCart,
  decreaseCameraCountInCart,
  setCameraCountInCart,
  isArrowDownKey,
  isArrowUpKey
} from '../../utils';
import {
  CameraCategory,
  ItemsCount,
  LocalStorageParameter,
  PageSetting
} from '../../const';

type CartItemProps = {
  camera: BookedCamera;
  openModalWindow: (state: boolean) => void;
};

function CartItem({ camera, openModalWindow }: CartItemProps): JSX.Element {
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
    level,
    price,
    count
  } = camera;
  const dispatch = useAppDispatch();
  const [totalCount, setTotalCount] = useState<number>(count);
  const handleSetTotalCount = (event: ChangeEvent<HTMLInputElement>) => {
    setTotalCount(
      Number(event.target.value) >= ItemsCount.Min
        ?
        Number(event.target.value)
        :
        ItemsCount.Min
    );
  };
  const handleCheckTotalCount = () => {
    if (totalCount !== count) {
      if (totalCount < ItemsCount.Min) {
        setTotalCount(ItemsCount.Min);
      }
      else if (totalCount > ItemsCount.Max) {
        setTotalCount(ItemsCount.Max);
      }
      localStorage.setItem(LocalStorageParameter.BookedCameras,
        JSON.stringify(setCameraCountInCart(
          getBookedCamerasFromLocalStorage(),
          {
            id,
            count: totalCount
          })
        )
      );
      dispatch(setItemCountInCart({
        id,
        count: totalCount
      }));
    }
    else {
      setTotalCount(count);
    }
  };
  const handleDecreaseTotalCount = () => {
    setTotalCount(totalCount - 1);
    localStorage.setItem(LocalStorageParameter.BookedCameras,
      JSON.stringify(decreaseCameraCountInCart(
        getBookedCamerasFromLocalStorage(),
        id)
      )
    );
    dispatch(decreaseItemCountInCart(id));
  };
  const handleIncreaseTotalCount = () => {
    setTotalCount(totalCount + 1);
    localStorage.setItem(LocalStorageParameter.BookedCameras,
      JSON.stringify(addCameraToCart(
        getBookedCamerasFromLocalStorage(),
        camera)
      )
    );
    dispatch(increaseItemCountInCart(camera));
  };
  const handleArrowKeys = (event: KeyboardEvent<HTMLInputElement>) => {
    if (isArrowUpKey(event.key)) {
      if (Number(totalCount) + PageSetting.Step <= ItemsCount.Max) {
        setTotalCount(Number(totalCount) + PageSetting.Step);
      }
    }
    else if (isArrowDownKey(event.key)) {
      if (Number(totalCount) - PageSetting.Step >= ItemsCount.Min) {
        setTotalCount(Number(totalCount) - PageSetting.Step);
      }
    }
  };
  const handleRemoveItem = () => {
    dispatch(setTempCamera(camera));
    openModalWindow(true);
  };
  return (
    <li className="basket-item">
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
        <p className="basket-item__title">
          {name}
        </p>
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
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>
        {price.toLocaleString()}&nbsp;₽
      </p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          onClick={handleDecreaseTotalCount}
          disabled={totalCount === ItemsCount.Min}
        >
          <svg
            width="7"
            height="12"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
        <label
          className="visually-hidden"
          htmlFor="counter1"
        >
        </label>
        <input
          type="number"
          id="counter1"
          name="counter1"
          min={ItemsCount.Min}
          max={ItemsCount.Max}
          onChange={handleSetTotalCount}
          onBlur={handleCheckTotalCount}
          onKeyDown={handleArrowKeys}
          value={String(totalCount)}
          step={PageSetting.Step}
          aria-label="количество товара"
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          onClick={handleIncreaseTotalCount}
          disabled={totalCount === ItemsCount.Max}
        >
          <svg
            width="7"
            height="12"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>
        &nbsp;
        {totalCount && (price * totalCount).toLocaleString()}&nbsp;₽
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={handleRemoveItem}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>);
}
export default CartItem;
