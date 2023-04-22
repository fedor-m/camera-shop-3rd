import { useState } from 'react';
import { Camera } from '../../types/camera';
import Card from '../card/card';
import { PageSetting } from '../../const';

type SimilarItemsProps = {
  cameras: Camera[];
  openModalWindow: (state: boolean) => void;
};

function SimilarItems({ cameras, openModalWindow }: SimilarItemsProps): JSX.Element {
  const indicies = cameras.map((camera) => camera.id);
  const [firstSlide, setFirstSlide] = useState(0);
  const [lastSlide, setLastSlide] = useState(PageSetting.SlidesNumber);
  const slides = indicies.slice(firstSlide, lastSlide);
  const [isBackButtonDisabled, setBackButtonDisabled] = useState(true);
  const [isNextButtonDisabled, setNextButtonDisabled] = useState(false);
  const cards = cameras.map((camera) => (
    <Card
      camera={camera}
      key={camera.id}
      isActive={slides.includes(camera.id)}
      openModalWindow={openModalWindow}
    />
  ));
  const handlePreviousSlideButtonClick = () => {
    const newFirstSlide = firstSlide - PageSetting.SlidesNumber;
    const newLastSlide = lastSlide - PageSetting.SlidesNumber;
    if (newFirstSlide === 0) {
      setBackButtonDisabled(true);
    }
    setFirstSlide(newFirstSlide);
    setLastSlide(newLastSlide);
    setNextButtonDisabled(false);
  };
  const handleNextSlideButtonClick = () => {
    const newFirstSlide = firstSlide + PageSetting.SlidesNumber;
    const newLastSlide = lastSlide + PageSetting.SlidesNumber;
    if (newLastSlide === cameras.length) {
      setNextButtonDisabled(true);
    }
    setFirstSlide(newFirstSlide);
    setLastSlide(newLastSlide);
    setBackButtonDisabled(false);
  };
  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {cards}
          </div>
          <button
            className="slider-controls slider-controls--prev"
            type="button"
            aria-label="Предыдущий слайд"
            disabled={isBackButtonDisabled}
            onClick={handlePreviousSlideButtonClick}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button
            className="slider-controls slider-controls--next"
            type="button"
            aria-label="Следующий слайд"
            disabled={isNextButtonDisabled}
            onClick={handleNextSlideButtonClick}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
      </div>
    </section >
  );
}
export default SimilarItems;
