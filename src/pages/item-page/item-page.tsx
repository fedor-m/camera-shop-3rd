import {
  useEffect,
  useState
} from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { store } from '../../store/store';
import { useAppSelector } from '../../hooks/use-app-selector';
import {
  fetchReviewsAction,
  fetchSelectedCameraAction,
  fetchSimilarItemsAction,
} from '../../store/item-state/api-actions';
import { } from '../../store/item-state/item-state';
import {
  getSelectedCamera,
  getSelectedCameraLoadingStatus,
  getSelectedCameraLoadingError,
  getSimilarItems,
  getSimilarItemsLoadingStatus,
  getReviews,
  getReviewsLoadingStatus,
  getAddedReview
} from '../../store/item-state/selectors';
import {
  setAddToBasketKeySwitched
} from '../../store/cart-state/cart-state';
import {
  getTempCamera,
  getBasketKeyStatus
} from '../../store/cart-state/selectors';
import {
  getSortedReviews,
  scrollToTop
} from '../../utils';
import NotFoundPage from '../not-found-page/not-found-page';
import Icons from '../../components/icons/icons';
import Header from '../../components/header/header';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import SelectedCamera from '../../components/selected-camera/selected-camera';
import SimilarItems from '../../components/similar-items/similar-items';
import Reviews from '../../components/reviews/reviews';
import Modal from '../../components/modal/modal';
import ReviewForm from '../../components/review-form/review-form';
import ReviewSuccess from '../../components/review-success/review-success';
import Footer from '../../components/footer/footer';
import Loader from '../../components/loader/loader';
import ItemToAdd from '../../components/item-to-add/item-to-add';
import ItemAddedSuccess from '../../components/item-added-success/item-added-success';


function ItemPage(): JSX.Element {
  const { id } = useParams();
  const itemID = Number(id);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      store.dispatch(fetchSelectedCameraAction(itemID));
      store.dispatch(fetchSimilarItemsAction(itemID));
      store.dispatch(fetchReviewsAction(itemID));
      scrollToTop(window);
    }
    return () => {
      isMounted = false;
    };
  }, [itemID]);
  const isSelectedItemLoading = useAppSelector(getSelectedCameraLoadingStatus);
  const selectedItem = useAppSelector(getSelectedCamera);
  const areSimilarItemsLoading = useAppSelector(getSimilarItemsLoadingStatus);
  const similarItems = useAppSelector(getSimilarItems);
  const areReviewsLoading = useAppSelector(getReviewsLoadingStatus);
  const reviews = useAppSelector(getReviews);
  const sortedReviews = getSortedReviews(reviews);
  const addedReview = useAppSelector(getAddedReview);
  const isBasketKeySwitched = useAppSelector(getBasketKeyStatus);
  const hasSelectedCameraLoadingError = useAppSelector(getSelectedCameraLoadingError);
  const tempCamera = useAppSelector(getTempCamera);
  const [isReviewModalWindowOpened, setReviewModalWindowOpened] = useState(false);
  const [isAddToBasketModalWindowOpened, setAddToBasketModalWindowOpened] = useState(false);
  const [isAddToBasketSimilarItemModalWindowOpened, setAddToBasketSimilarItemModalWindowOpened] = useState(false);
  const handleReviewModalSuccessClose = () => {
    store.dispatch(fetchReviewsAction(itemID));
    setReviewModalWindowOpened(false);
  };
  const handleAddToBasketModalSuccessClose = () => {
    store.dispatch(setAddToBasketKeySwitched(false));
    setAddToBasketModalWindowOpened(false);
  };
  const handleAddToBasketSimilarItemModalSuccessClose = () => {
    store.dispatch(setAddToBasketKeySwitched(false));
    setAddToBasketSimilarItemModalWindowOpened(false);
  };
  const handleArrowUpButtonClick = () => {
    scrollToTop(window);
  };
  if (hasSelectedCameraLoadingError) {
    return <NotFoundPage />;
  }
  return (
    <>
      <Helmet>
        <title>{selectedItem && selectedItem.name}</title>
      </Helmet>
      <Icons />
      <div className="wrapper">
        <Header />
        <main>
          <div className="page-content">
            {selectedItem && (
              <Breadcrumbs itemTitle={selectedItem.name} />
            )}
            <div className="page-content__section">
              {isSelectedItemLoading ? (
                <Loader />
              ) : (
                selectedItem &&
                <SelectedCamera
                  camera={selectedItem}
                  openModalWindow={setAddToBasketModalWindowOpened}
                />
              )}
            </div>
            <div className="page-content__section">
              {areSimilarItemsLoading ? (
                <Loader />
              ) : (
                selectedItem &&
                similarItems &&
                <SimilarItems
                  cameras={similarItems}
                  openModalWindow={setAddToBasketSimilarItemModalWindowOpened}
                />
              )}
            </div>
            <div className="page-content__section">
              {areReviewsLoading ? (
                <Loader />
              ) : (
                selectedItem &&
                reviews && (
                  <Reviews
                    reviews={sortedReviews}
                    openModalWindow={setReviewModalWindowOpened}
                  />
                )
              )}
            </div>
          </div>
          <button
            className="up-btn"
            onClick={handleArrowUpButtonClick}
          >
            <svg width="12" height="18" aria-hidden="true">
              <use xlinkHref="#icon-arrow2"></use>
            </svg>
          </button>
          {
            isReviewModalWindowOpened &&
            (
              addedReview === null ? (
                <Modal
                  openModalWindow={setReviewModalWindowOpened}
                  title="Оставить отзыв"
                >
                  <ReviewForm itemID={itemID} />
                </Modal>
              ) :
                (

                  <Modal
                    openModalWindow={handleReviewModalSuccessClose}
                    title="Спасибо за отзыв"
                    isNarrow
                  >
                    <ReviewSuccess
                      onContinueButtonClick={handleReviewModalSuccessClose}
                    />
                  </Modal>
                )
            )
          }
          {
            tempCamera && isAddToBasketModalWindowOpened && (
              !isBasketKeySwitched
                ?
                (
                  <Modal
                    openModalWindow={setAddToBasketModalWindowOpened}
                    title="Добавить товар в корзину"
                  >
                    <ItemToAdd camera={tempCamera} />
                  </Modal>
                )
                :
                (
                  <Modal
                    openModalWindow={handleAddToBasketModalSuccessClose}
                    title="Товар успешно добавлен в корзину"
                    isNarrow
                  >
                    <ItemAddedSuccess />
                  </Modal>

                )
            )
          }
          {
            tempCamera && isAddToBasketSimilarItemModalWindowOpened && (
              !isBasketKeySwitched
                ?
                (
                  <Modal
                    openModalWindow={setAddToBasketSimilarItemModalWindowOpened}
                    title="Добавить товар в корзину"
                  >
                    <ItemToAdd camera={tempCamera} />
                  </Modal>
                )
                :
                (
                  <Modal
                    openModalWindow={handleAddToBasketSimilarItemModalSuccessClose}
                    title="Товар успешно добавлен в корзину"
                    isNarrow
                  >
                    <ItemAddedSuccess />
                  </Modal>

                )
            )
          }
        </main>
        <Footer />
      </div>
    </>
  );
}
export default ItemPage;
