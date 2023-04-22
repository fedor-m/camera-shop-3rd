import {
  useEffect,
  useState
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks/use-app-selector';
import { store } from '../../store/store';
import {
  getPromoLoadingStatus,
  getPromo,
} from '../../store/promo-state/selectors';
import {
  fetchCamerasAction,
  fetchPricesAction
} from '../../store/cameras-state/api-actions';
import {
  setAddToBasketKeySwitched
} from '../../store/cart-state/cart-state';
import {
  getCamerasLoadingStatus,
  getCameras,
  getCamerasTotalCount,
} from '../../store/cameras-state/selectors';
import {
  getTempCamera,
  getBasketKeyStatus
} from '../../store/cart-state/selectors';
import {
  getItemNumbersToPage,
  getPageNumber
} from '../../utils';
import { Url } from '../../types/url';
import { Filter } from '../../types/filter';
import {
  QueryParameter,
  PageSetting
} from '../../const';
import Icons from '../../components/icons/icons';
import Header from '../../components/header/header';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import FilterForm from '../../components/filter-form/filter-form';
import SortForm from '../../components/sort-form/sort-form';
import Loader from '../../components/loader/loader';
import Cards from '../../components/cards/cards';
import Pagination from '../../components/pagination/pagination';
import Footer from '../../components/footer/footer';
import Modal from '../../components/modal/modal';
import ItemToAdd from '../../components/item-to-add/item-to-add';
import ItemAddedSuccess from '../../components/item-added-success/item-added-success';


function CataloguePage(): JSX.Element {
  const isPromoLoading = useAppSelector(getPromoLoadingStatus);
  const promo = useAppSelector(getPromo);
  const [searchParams] = useSearchParams();
  const page = searchParams.get(QueryParameter.Page);
  const pageNumber = getPageNumber(Number(page));
  const total = useAppSelector(getCamerasTotalCount);
  const { start, end } = getItemNumbersToPage(pageNumber, Number(total));
  useEffect(() => {
    const url: Url = {
      start: start,
      end: end,
      sort: searchParams.get(QueryParameter.Sort),
      order: searchParams.get(QueryParameter.Order),
      priceGte: Number(searchParams.get(QueryParameter.PriceGte)),
      priceLte: Number(searchParams.get(QueryParameter.PriceLte)),
      category: searchParams.get(QueryParameter.Category),
      types: searchParams.getAll(QueryParameter.Type),
      levels: searchParams.getAll(QueryParameter.Level)
    };
    const filter: Filter = {
      category: searchParams.get(QueryParameter.Category),
      types: searchParams.getAll(QueryParameter.Type),
      levels: searchParams.getAll(QueryParameter.Level)
    };
    let isMounted = true;
    if (isMounted) {
      store.dispatch(fetchCamerasAction(url));
      store.dispatch(fetchPricesAction(filter));
    }
    return () => {
      isMounted = false;
    };
  }, [
    start, end, searchParams
  ]);
  const areCamerasLoading = useAppSelector(getCamerasLoadingStatus);
  const cameras = useAppSelector(getCameras);
  const tempCamera = useAppSelector(getTempCamera);
  const isTempCameraAdded = useAppSelector(getBasketKeyStatus);
  const [isAddToBasketModalWindowOpened, setAddToBasketModalWindowOpened] = useState(false);
  const handleAddToBasketModalSuccessClose = () => {
    store.dispatch(setAddToBasketKeySwitched(false));
    setAddToBasketModalWindowOpened(false);
  };
  return (
    <>
      <Helmet>
        <title>Каталог</title>
      </Helmet>
      <Icons />
      <div className="wrapper">
        <Header />
        <main>
          {
            isPromoLoading
              ?
              <Loader />
              :
              promo && <Banner promo={promo} />
          }
          {
            !promo && <div className="title">Пожалуйста, обновите страницу или войдите позже</div>
          }
          <div className="page-content">
            <Breadcrumbs />
            <section className="catalog">
              <div className="container">
                <h1 className="title title--h2">
                  Каталог фото- и видеотехники
                </h1>
                <div className="page-content__columns">
                  <FilterForm />
                  <div className="catalog__content">
                    <SortForm />
                    {areCamerasLoading ? (
                      <Loader />
                    ) : (
                      <>
                        {Number(cameras?.length) > 0 &&
                          <Cards
                            cameras={cameras}
                            openModalWindow={setAddToBasketModalWindowOpened}
                          />}
                        {Number(cameras?.length) > 0 && Number(total) > PageSetting.CardsNumber && <Pagination camerasLength={Number(total)} />}
                        {Number(cameras?.length) === 0 && <div className="title">Нет результатов, удовлетворяющих условиям</div>}
                        {!cameras && <div className="title">Пожалуйста, обновите страницу или войдите позже</div>}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </section>
            {
              isAddToBasketModalWindowOpened && tempCamera && (
                !(isTempCameraAdded)
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
                      <ItemAddedSuccess openModalWindow={setAddToBasketModalWindowOpened} />
                    </Modal>

                  )
              )
            }
          </div>
        </main>
        <Footer />
      </div >
    </>
  );
}
export default CataloguePage;
