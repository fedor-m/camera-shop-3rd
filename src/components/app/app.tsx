import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import CataloguePage from '../../pages/catalogue-page/catalogue-page';
import ItemPage from '../../pages/item-page/item-page';
import BasketPage from '../../pages/cart-page/cart-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { AppRoute } from '../../const';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Catalogue}
          element={<CataloguePage />}
        />
        <Route
          path={`${AppRoute.Item}/:id`}
          element={<ItemPage />}
        />
        <Route
          path={AppRoute.Cart}
          element={<BasketPage />}
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFoundPage />}
        />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
