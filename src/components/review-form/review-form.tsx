import { useState, Fragment, ChangeEvent, FormEvent } from 'react';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { getReviewFormBlockedStatus } from '../../store/item-state/selectors';
import { sendReviewAction } from '../../store/item-state/api-actions';
import { PageSetting, Rating, RATINGS, Field, CustomInput } from '../../const';

type ReviewFormProps = {
  itemID: number;
};

function ReviewForm({ itemID }: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isReviewFormBlocked = useAppSelector(getReviewFormBlockedStatus);
  const formState = {
    cameraId: itemID,
    userName: '',
    advantage: '',
    disadvantage: '',
    review: '',
    rating: '0',
  };
  const errorsState = {
    userName: false,
    advantage: false,
    disadvantage: false,
    review: false,
    rating: false,
  };
  const [formData, setFormData] = useState(formState);
  const [errors, setErrors] = useState(errorsState);
  const [isFormTouched, setFormTouched] = useState(false);
  const checkFieldsSubmittedCorrectly = (): boolean => {
    const { userName, advantage, disadvantage, review, rating } =
      formData;
    return (
      userName.trim().length > 0 &&
      advantage.trim().length > 0 &&
      disadvantage.trim().length > 0 &&
      review.trim().length >= PageSetting.MinReviewLength &&
      Number(rating) >= Rating.Min &&
      Number(rating) <= Rating.Max
    );
  };
  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (isFormTouched) {
      switch (name) {
        case Field.Rating: {
          setErrors({
            ...errors,
            rating: Number(value) < Rating.Min || Number(value) > Rating.Max
          });
          break;
        }
        case Field.UserName: {
          setErrors({
            ...errors,
            userName: value.trim().length === 0
          });
          break;
        }
        case Field.Advantage: {
          setErrors({
            ...errors,
            advantage: value.trim().length === 0
          });
          break;
        }
        case Field.Disadvantage: {
          setErrors({
            ...errors,
            disadvantage: value.trim().length === 0
          });
          break;
        }
        case Field.Review: {
          setErrors({
            ...errors,
            review: value.trim().length < PageSetting.MinReviewLength
          });
          break;
        }
      }
    }
  };
  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    setFormTouched(true);
    if (checkFieldsSubmittedCorrectly()) {
      const { cameraId, userName, advantage, disadvantage, review, rating } =
        formData;
      dispatch(
        sendReviewAction({
          cameraId,
          userName,
          advantage,
          disadvantage,
          review,
          rating: +rating,
        })
      ).then(() => {
        setFormData(formState);
        setErrors(errorsState);
        setFormTouched(false);
      });
    }
    else {
      setErrors({
        ...errors,
        userName: formData.userName.trim().length === 0,
        advantage: formData.advantage.trim().length === 0,
        disadvantage: formData.disadvantage.trim().length === 0,
        review: formData.review.trim().length < PageSetting.MinReviewLength,
        rating:
          Number(formData.rating) < Rating.Min ||
          Number(formData.rating) > Rating.Max
      });
    }
  };
  const starsInputs = RATINGS.map((rating) => (
    <Fragment key={`star-${rating.mark}`}>
      <input
        className="visually-hidden"
        id={`star-${rating.mark}`}
        name="rating"
        type="radio"
        defaultValue={rating.mark}
        onChange={handleFieldChange}
        disabled={isReviewFormBlocked}
      />
      <label
        className="rate__label"
        htmlFor={`star-${rating.mark}`}
        title={rating.text}
      />
    </Fragment>
  ));
  const rateClass = `${CustomInput.Rate} ${CustomInput.ReviewItem}`;
  const inputClass = `${CustomInput.Class} ${CustomInput.ReviewItem}`;
  const textAreaClass = `${CustomInput.TextAreaClass} ${CustomInput.ReviewItem}`;
  return (
    <form method="post" noValidate onSubmit={handleFormSubmit}>
      <div className="form-review__rate">
        <fieldset
          className={`${rateClass}${errors.rating ? ` ${CustomInput.Invalid}` : ''} `}
        >
          <legend className="rate__caption">
            Рейтинг
            <svg width="9" height="9" aria-hidden="true">
              <use xlinkHref="#icon-snowflake" />
            </svg>
          </legend>
          <div className="rate__bar">
            <div className="rate__group">
              {starsInputs}
            </div>
            <div className="rate__progress">
              <span className="rate__stars">{formData.rating}</span>
              <span>&nbsp;</span>
              <span>/</span>
              <span>&nbsp;</span>
              <span className="rate__all-stars">{Rating.Max}</span>
            </div>
          </div>
          <p className="rate__message">Нужно оценить товар</p>
        </fieldset>
        <div
          className={`${inputClass}${errors.userName ? ` ${CustomInput.Invalid}` : ''} `}
        >
          <label>
            <span className="custom-input__label">
              Ваше имя
              <svg width="9" height="9" aria-hidden="true">
                <use xlinkHref="#icon-snowflake" />
              </svg>
            </span>
            <input
              type="text"
              name="userName"
              placeholder="Введите ваше имя"
              defaultValue={formData.userName}
              onChange={handleFieldChange}
              disabled={isReviewFormBlocked}
            />
          </label>
          <p className="custom-input__error">Нужно указать имя</p>
        </div>
        <div
          className={`${inputClass}${errors.advantage ? ` ${CustomInput.Invalid}` : ''} `}
        >
          <label>
            <span className="custom-input__label">
              Достоинства
              <svg width="9" height="9" aria-hidden="true">
                <use xlinkHref="#icon-snowflake" />
              </svg>
            </span>
            <input
              type="text"
              name="advantage"
              placeholder="Основные преимущества товара"
              defaultValue={formData.advantage}
              onChange={handleFieldChange}
              disabled={isReviewFormBlocked}
            />
          </label>
          <p className="custom-input__error">Нужно указать достоинства</p>
        </div>
        <div
          className={`${inputClass}${errors.disadvantage ? ` ${CustomInput.Invalid}` : ''} `}
        >
          <label>
            <span className="custom-input__label">
              Недостатки
              <svg width="9" height="9" aria-hidden="true">
                <use xlinkHref="#icon-snowflake" />
              </svg>
            </span>
            <input
              type="text"
              name="disadvantage"
              placeholder="Главные недостатки товара"
              defaultValue={formData.disadvantage}
              onChange={handleFieldChange}
              disabled={isReviewFormBlocked}
            />
          </label>
          <p className="custom-input__error">Нужно указать недостатки</p>
        </div>
        <div
          className={`${textAreaClass}${errors.review ? ` ${CustomInput.Invalid}` : ''} `}
        >
          <label>
            <span className="custom-textarea__label">
              Комментарий
              <svg width="9" height="9" aria-hidden="true">
                <use xlinkHref="#icon-snowflake" />
              </svg>
            </span>
            <textarea
              name="review"
              minLength={5}
              placeholder="Поделитесь своим опытом покупки"
              defaultValue={formData.review}
              onChange={handleFieldChange}
              disabled={isReviewFormBlocked}
            />
          </label>
          <div className="custom-textarea__error">
            Нужно добавить комментарий
          </div>
        </div>
      </div >
      <button
        className="btn btn--purple form-review__btn"
        type="submit"
        disabled={isReviewFormBlocked}
      >
        Отправить отзыв
      </button>
    </form >
  );
}
export default ReviewForm;
