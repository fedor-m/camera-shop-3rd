type ReviewSuccessProps = {
  onContinueButtonClick: () => void;
};

function ReviewSuccess({ onContinueButtonClick }: ReviewSuccessProps): JSX.Element {
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
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          onClick={onContinueButtonClick}
        >Вернуться к покупкам
        </button>
      </div>
    </>
  );
}
export default ReviewSuccess;
