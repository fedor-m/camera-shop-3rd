import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';

type BreadcrumbsProps = {
  itemTitle?: string;
};

function Breadcrumbs({ itemTitle }: BreadcrumbsProps): JSX.Element {
  const { pathname } = useLocation();
  const iconArrowMini = (
    <svg
      width="5"
      height="8"
      aria-hidden="true"
    >
      <use xlinkHref="#icon-arrow-mini" />
    </svg>
  );
  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <a
              className="breadcrumbs__link"
              {...(pathname === AppRoute.Catalogue ? {} : { href: AppRoute.Catalogue })}
            >
              Главная
              {iconArrowMini}
            </a>
          </li>
          <li className="breadcrumbs__item">
            {
              pathname === AppRoute.Catalogue
                ?
                <span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
                :
                <Link className="breadcrumbs__link" to={AppRoute.Catalogue}>Каталог
                  {iconArrowMini}
                </Link>
            }
          </li>
          {
            pathname.match(AppRoute.Cart) &&
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">
                Корзина
              </span>
            </li>
          }
          {
            pathname.match(AppRoute.Item) &&
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">
                {itemTitle}
              </span>
            </li>
          }
        </ul>
      </div>
    </div>
  );
}
export default Breadcrumbs;
