import { Review } from '../../types/review';
import {
  getDateFormatBasic,
  getDateFormatRU,
  getStarsInRating
} from '../../utils';

type ReviewCardProps = {
  review: Review;
};

function ReviewCard({ review }: ReviewCardProps): JSX.Element {
  const {
    userName,
    createAt,
    rating,
    advantage,
    disadvantage,
    review: comment,
  } = review;
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
  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime={getDateFormatBasic(createAt)}>
          {getDateFormatRU(createAt)}
        </time>
      </div>
      <div className="rate review-card__rate">
        {goldStars}
        {greyStars}
        <p className="visually-hidden">{`Оценка: ${rating}`}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list">
          <span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">
            {advantage}
          </p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">
            {comment}
          </p>
        </li>
      </ul>
    </li>
  );
}
export default ReviewCard;
