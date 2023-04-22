import { useState } from 'react';
import { Camera } from '../../types/camera';
import { Tab } from '../../const';
import { getStarsInRating } from '../../utils';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { setTempCamera } from '../../store/cart-state/cart-state';

type SelectedCameraProps = {
  camera: Camera;
  openModalWindow: (state: boolean) => void;
};

function SelectedCamera({ camera, openModalWindow }: SelectedCameraProps): JSX.Element {
  const [tab, setActiveTab] = useState(Tab.Description);
  const {
    name,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    vendorCode,
    type,
    category,
    description,
    level,
    rating,
    price,
    reviewCount
  } = camera;
  const stars = getStarsInRating(rating);
  const goldStars = stars.gold.map(
    (star) => (
      <svg
        width="17"
        height="16"
        aria-hidden="true"
        key={`star_${star}`}
      >
        <use xlinkHref="#icon-full-star"></use>
      </svg>
    )
  );
  const greyStars = stars.grey.map(
    (star) => (
      <svg
        width="17"
        height="16"
        aria-hidden="true"
        key={`star_${star}`}
      >
        <use xlinkHref="#icon-star"></use>
      </svg>
    )
  );
  const handleCharacteristicsButtonClick = () =>
    setActiveTab(Tab.Characteristics);
  const handleDescriptionButtonClick = () =>
    setActiveTab(Tab.Description);
  const dispatch = useAppDispatch();
  const handleModalWindowOpen = () => {
    dispatch(setTempCamera(camera));
    openModalWindow(true);
  };
  return (
    <section className="product">
      <div className="container">
        <div className="product__img">
          <picture>
            <source
              type="image/webp"
              srcSet={`/${previewImgWebp}, /${previewImgWebp2x}`}
            />
            <img
              src={`/${previewImg}`}
              srcSet={`/${previewImg2x}`}
              width="560"
              height="480"
              alt={name}
            />
          </picture>
        </div>
        <div className="product__content">
          <h1 className="title title--h3">
            {name}
          </h1>
          <div className="rate product__rate">
            {goldStars}
            {greyStars}
            <p className="visually-hidden">Рейтинг: {rating}</p>
            <p className="rate__count">
              <span className="visually-hidden">Всего оценок:</span> {reviewCount}
            </p>
          </div>
          <p className="product__price">
            <span className="visually-hidden">Цена:</span>{price.toLocaleString()}&nbsp;₽
          </p>
          <button
            className="btn btn--purple"
            type="button"
            onClick={handleModalWindowOpen}
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
          <div className="tabs product__tabs">
            <div className="tabs__controls product__tabs-controls">
              <button
                className={`tabs__control${tab === Tab.Characteristics ? ' is-active' : ''}`}
                type="button"
                onClick={handleCharacteristicsButtonClick}
              >
                Характеристики
              </button>
              <button
                className={`tabs__control${tab === Tab.Description ? ' is-active' : ''}`}
                type="button"
                onClick={handleDescriptionButtonClick}
              >
                Описание
              </button>
            </div>
            <div className="tabs__content">
              <div className={`tabs__element${tab === Tab.Characteristics ? ' is-active' : ''}`}>
                <ul className="product__tabs-list">
                  <li className="item-list">
                    <span className="item-list__title">Артикул:</span>
                    <p className="item-list__text">{vendorCode}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">
                      Категория:
                    </span>
                    <p className="item-list__text">{category}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">
                      Тип камеры:
                    </span>
                    <p className="item-list__text">{type}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Уровень:</span>
                    <p className="item-list__text">{level}</p>
                  </li>
                </ul>
              </div>
              <div className={`tabs__element${tab === Tab.Description ? ' is-active' : ''}`}>
                <div className="product__tabs-text">
                  <p>
                    {description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default SelectedCamera;
