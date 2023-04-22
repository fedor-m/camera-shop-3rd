import {
  useState,
  useEffect
} from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks/use-app-selector';
import {
  getBookedCameras,
  getTempCamera
} from '../../store/cart-state/selectors';
import { BookedCamera } from '../../types/booked-camera';
import { scrollToTop } from '../../utils';
import Icons from '../../components/icons/icons';
import Header from '../../components/header/header';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import CartSummary from '../../components/cart-summary/cart-summary';
import CartItem from '../../components/cart-item/cart-item';
import Modal from '../../components/modal/modal';
import ItemToRemove from '../../components/item-to-remove/item-to-remove';
import OrderSuccess from '../../components/order-success/order-success';


function CartPage(): JSX.Element {
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      scrollToTop(window);
    }
    return () => {
      isMounted = false;
    };
  }, []);
  const bookedCameras = useAppSelector(getBookedCameras);
  const bookedCamerasCounts = bookedCameras.map(
    (item) => ({
      'id': item.id,
      'count': bookedCameras?.filter((camera) => item.id === camera.id).length
    })
  );
  const filteredBookedCameras = [
    ...new Map(bookedCameras.map((item) => [item.id, item])).values()
  ];
  const filteredBookedCamerasCounts = [
    ...new Map(bookedCamerasCounts.map((item) => [item.id, item])).values(),
  ];
  const groupedBookedCameras = filteredBookedCameras.map(
    (camera) => ({
      ...camera,
      count: (filteredBookedCamerasCounts.find((item) => camera.id === item.id) as BookedCamera).count
    })
  );
  const [isRemoveModalWindowOpened, setRemoveModalWindowOpened] = useState(false);
  const [isSuccessOrderModalWindowOpened, setSuccessOrderModalWindowOpened] = useState(false);
  const bookedCamerasCards = groupedBookedCameras.map(
    (camera) => (
      <CartItem
        camera={camera}
        key={camera.id}
        openModalWindow={setRemoveModalWindowOpened}
      />
    )
  );
  const tempCamera = useAppSelector(getTempCamera);
  const totalSum = bookedCameras.reduce((acc, item) => acc + item.price, 0);
  return (
    <>
      <Helmet>
        <title>Корзина</title>
      </Helmet>
      <Icons />
      <div className="wrapper">
        <Header />
        <main>
          <div className="page-content">
            <Breadcrumbs />
            <section className="basket">
              <div className="container">
                <h1 className="title title--h2">Корзина</h1>
                {
                  bookedCameras && bookedCameras.length > 0
                    ?
                    <>
                      <ul className="basket__list">
                        {bookedCamerasCards}
                      </ul>
                      <CartSummary
                        totalSum={totalSum}
                        openModalWindow={setSuccessOrderModalWindowOpened}
                      />
                    </>
                    :
                    <div>Корзина пуста</div>
                }

              </div>
            </section>
          </div>
          {
            isRemoveModalWindowOpened && tempCamera &&
            <Modal
              title="Удалить этот товар?"
              openModalWindow={setRemoveModalWindowOpened}
            >
              <ItemToRemove
                camera={tempCamera}
                openModalWindow={setRemoveModalWindowOpened}
              />
            </Modal>
          }
          {
            isSuccessOrderModalWindowOpened &&
            <Modal
              title="Спасибо за покупку"
              openModalWindow={setSuccessOrderModalWindowOpened}
              isNarrow
            >
              <OrderSuccess />
            </Modal>
          }
        </main>
        <Footer />
      </div >
    </>
  );
}
export default CartPage;
