import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import SearchForm from '../search-form/search-form';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getBookedItemsQuantity } from '../../store/cart-state/selectors';

function Header(): JSX.Element {
  const { pathname } = useLocation();
  const isMainPage = pathname === (AppRoute.Catalogue);
  const bookedItemsQuantity = useAppSelector(getBookedItemsQuantity);
  return (
    <header
      className="header"
      id="header"
    >
      <div className="container">
        {
          isMainPage ?
            <a
              className="header__logo"
              aria-label="Переход на главную"
              {...(!isMainPage ? { href: `${AppRoute.Catalogue}` } : {})}
            >
              <svg
                width="100"
                height="36"
                aria-hidden="true"
              >
                <use xlinkHref="#icon-logo" />
              </svg>
            </a>
            :
            <Link
              className="header__logo"
              to={AppRoute.Catalogue}
              aria-label="Переход на главную"
            >
              <svg
                width="100"
                height="36"
                aria-hidden="true"
              >
                <use xlinkHref="#icon-logo" />
              </svg>
            </Link>

        }
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              {
                isMainPage
                  ?
                  <a
                    className="main-nav__link"
                    {...(!isMainPage ? { href: `${AppRoute.Catalogue}` } : {})}
                  >
                    Каталог
                  </a>
                  :
                  <Link
                    className="main-nav__link"
                    to={AppRoute.Catalogue}
                  >
                    Каталог
                  </Link>
              }
            </li>
            <li className="main-nav__item">
              <a
                className="main-nav__link"
                href="#guarantees"
              >
                Гарантии
              </a>
            </li>
            <li className="main-nav__item">
              <a
                className="main-nav__link"
                href="#delivery"
              >
                Доставка
              </a>
            </li>
            <li className="main-nav__item">
              <a
                className="main-nav__link"
                href="#about"
              >
                О компании
              </a>
            </li>
          </ul>
        </nav>
        <SearchForm />
        <Link
          className="header__basket-link"
          to={AppRoute.Cart}
        >
          <svg
            width="16"
            height="16"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-basket" />
          </svg>
          {
            bookedItemsQuantity > 0 &&
            <span className="header__basket-count">
              {bookedItemsQuantity}
            </span>
          }
        </Link>
      </div>
    </header>
  );
}
export default Header;
