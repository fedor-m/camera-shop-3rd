import { useState } from 'react';
import { Review } from '../../types/review';
import ReviewCard from '../review-card/review-card';
import { PageSetting } from '../../const';

type ReviewsProps = {
  reviews: Review[] | null;
  openModalWindow: (state: boolean) => void;
};

function Reviews({ reviews, openModalWindow }: ReviewsProps): JSX.Element {
  const [reviewsToDisplay, setReviewsToDisplay] = useState(PageSetting.ReviewsNumber);
  const checkReviewsLength = () => reviews && reviews.length < PageSetting.ReviewsNumber;
  const [isMoreReviewsButtonDisabled, setIsMoreReviewsButtonDisabled] = useState(checkReviewsLength());
  const reviewCards = reviews && reviews.slice(0, reviewsToDisplay).map((review) => (
    <ReviewCard
      key={review.id}
      review={review}
    />
  ));
  const handleDisplayMoreReviewsButtonClick = () => {
    const newReviews = reviewsToDisplay + PageSetting.ReviewsNumber;
    const areReviewsReachedLimit = reviews && (
      newReviews >= reviews.length
      ||
      checkReviewsLength()
    );
    if (areReviewsReachedLimit) {
      setIsMoreReviewsButtonDisabled(true);
    }
    setReviewsToDisplay(newReviews);
  };
  const handleModalWindowOpen = () =>
    openModalWindow(true);
  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button
            className="btn"
            type="button"
            onClick={handleModalWindowOpen}
          >
            Оставить свой отзыв
          </button>
        </div>
        <ul className="review-block__list">
          {reviewCards}
        </ul>
        <div className="review-block__buttons">
          {
            !isMoreReviewsButtonDisabled &&
            <button
              className="btn btn--purple"
              type="button"
              onClick={handleDisplayMoreReviewsButtonClick}
            >
              Показать больше отзывов
            </button>

          }
        </div>
      </div>
    </section>
  );
}
export default Reviews;
