import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';

function Footer(): JSX.Element {
  const { pathname } = useLocation();
  const isMainPage = pathname === (AppRoute.Catalogue);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__info">
          {
            isMainPage
              ?
              <a
                className="footer__logo"
                aria-label="Переход на главную"
                {...(!isMainPage ? { href: `${AppRoute.Catalogue}` } : {})}
              >
                <svg
                  width="100"
                  height="36"
                  aria-hidden="true"
                >
                  <use xlinkHref="#icon-logo-mono" />
                </svg>
              </a>
              :
              <Link
                className="footer__logo"
                to={AppRoute.Catalogue}
                aria-label="Переход на главную"
              >
                <svg
                  width="100"
                  height="36"
                  aria-hidden="true"
                >
                  <use xlinkHref="#icon-logo-mono" />
                </svg>
              </Link>
          }
          <p className="footer__description">
            Интернет-магазин фото- и видеотехники
          </p>
          <ul className="social">
            <li className="social__item">
              <a
                className="link"
                href="#vk"
                aria-label="Переход на страницу вконтатке"
              >
                <svg
                  width="20"
                  height="20"
                  aria-hidden="true"
                >
                  <use xlinkHref="#icon-vk" />
                </svg>
              </a>
            </li>
            <li className="social__item">
              <a
                className="link"
                href="#pinterest"
                aria-label="Переход на страницу pinterest"
              >
                <svg
                  width="20"
                  height="20"
                  aria-hidden="true"
                >
                  <use xlinkHref="#icon-pinterest" />
                </svg>
              </a>
            </li>
            <li className="social__item">
              <a
                className="link"
                href="#reddit"
                aria-label="Переход на страницу reddit"
              >
                <svg
                  width="20"
                  height="20"
                  aria-hidden="true"
                >
                  <use xlinkHref="#icon-reddit" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <ul className="footer__nav">
          <li className="footer__nav-item">
            <p className="footer__title">Навигация</p>
            <ul className="footer__list">
              <li className="footer__item">
                {
                  isMainPage
                    ?
                    <a
                      className="link"
                      {...(!isMainPage ? { href: `${AppRoute.Catalogue}` } : {})}
                    >
                      Каталог
                    </a>
                    :
                    <Link className="link" to={AppRoute.Catalogue}>
                      Каталог
                    </Link>
                }
              </li>
              <li className="footer__item">
                <a
                  className="link"
                  href="#guarantee"
                >
                  Гарантии
                </a>
              </li>
              <li className="footer__item">
                <a
                  className="link"
                  href="#delivery"
                >
                  Доставка
                </a>
              </li>
              <li className="footer__item">
                <a
                  className="link"
                  href="#about"
                >
                  О компании
                </a>
              </li>
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Ресурсы</p>
            <ul className="footer__list">
              <li className="footer__item">
                <a
                  className="link"
                  href="#courses"
                >
                  Курсы операторов
                </a>
              </li>
              <li className="footer__item">
                <a
                  className="link"
                  href="#blog"
                >
                  Блог
                </a>
              </li>
              <li className="footer__item">
                <a
                  className="link"
                  href="#community"
                >
                  Сообщество
                </a>
              </li>
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Поддержка</p>
            <ul className="footer__list">
              <li className="footer__item">
                <a
                  className="link"
                  href="#faq"
                >
                  FAQ
                </a>
              </li>
              <li className="footer__item">
                <a
                  className="link"
                  href="#ask"
                >
                  Задать вопрос
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </footer>
  );
}
export default Footer;
