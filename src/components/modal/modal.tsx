import { useEffect } from 'react';
import { isEscKey } from '../../utils';
import FocusLock from 'react-focus-lock';

type ModalProps = {
  openModalWindow: (state: boolean) => void;
  title: string;
  children?: JSX.Element;
  isNarrow?: boolean;
};

function Modal({
  openModalWindow,
  title,
  children,
  isNarrow
}: ModalProps): JSX.Element {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (isEscKey(event.key)) {
        openModalWindow(false);
      }
    };
    let isMounted = true;
    if (isMounted) {
      document.body.classList.add('no-scroll');
      document.body.classList.add('scroll-lock');
      document.addEventListener('keydown', handleEscKey);
    }
    return () => {
      isMounted = false;
      document.body.classList.remove('no-scroll');
      document.body.classList.remove('scroll-lock');
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [openModalWindow]);
  const handleModalWindowClose = () => {
    openModalWindow(false);
  };
  return (
    <FocusLock>
      <div
        className={`modal is-active${isNarrow ? ' modal--narrow' : ''}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal__wrapper">
          <div
            className="modal__overlay"
            onClick={handleModalWindowClose}
          />
          <div className="modal__content">
            <p className="title title--h4">{title}</p>
            {children}
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              onClick={handleModalWindowClose}
            >
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </FocusLock>
  );
}
export default Modal;
