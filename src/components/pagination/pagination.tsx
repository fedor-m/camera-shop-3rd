import { Link, useLocation, useSearchParams } from 'react-router-dom';
import {
  PageNumber,
  QueryParameter,
} from '../../const';
import {
  getPageNumber,
  getPagesNumber
} from '../../utils';

type PaginationProps = {
  camerasLength: number;
};

function Pagination({ camerasLength }: PaginationProps): JSX.Element {
  const url = useLocation();
  const [searchParams] = useSearchParams();
  const page = searchParams.get(QueryParameter.Page);
  const pageNumber = getPageNumber(Number(page));
  const pagesNumber = camerasLength && getPagesNumber(camerasLength);
  const pagesList = [...Array.from({ length: pagesNumber }).keys()];
  const isFirstPage = PageNumber.First;
  const isSecondPage = pageNumber === PageNumber.Second;
  const isLastPage = pageNumber === pagesNumber;
  const prevPageParams = new URLSearchParams(searchParams.toString());
  if (isSecondPage) {
    prevPageParams.delete(QueryParameter.Page);
  }
  else {
    prevPageParams.set(QueryParameter.Page, String(pageNumber - 1));
  }
  const urlPrevious = `${url.pathname}?${prevPageParams.toString()}`;
  const nextPageParams = new URLSearchParams(searchParams.toString());
  nextPageParams.set(QueryParameter.Page, String(pageNumber + 1));
  const urlNext = `${url.pathname}?${nextPageParams.toString()}`;
  const pagesParams = new URLSearchParams(searchParams.toString());
  const paginationItems = pagesList.map((item) => {
    item === 0
      ?
      pagesParams.delete(QueryParameter.Page)
      :
      pagesParams.set(QueryParameter.Page, String(item + 1));
    const link = `${url.pathname}?${pagesParams.toString()}`;
    const className = `pagination__link${item + 1 === pageNumber ? ' pagination__link--active' : ''} `;
    return (
      <li
        key={item + 1}
        className="pagination__item"
      >
        {
          <Link
            className={className}
            to={link}
          >
            {item + 1}
          </Link>
        }
      </li>
    );
  }
  );
  const previousPageButton = (
    <li className="pagination__item">
      <Link
        className="pagination__link pagination__link--text"
        to={urlPrevious}
      >
        Назад
      </Link>
    </li>
  );
  const nextPageButton = (
    <li className="pagination__item">
      <Link
        className="pagination__link pagination__link--text"
        to={urlNext}
      >
        Далее
      </Link>
    </li >
  );

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {
          !isFirstPage && previousPageButton
        }
        {paginationItems}
        {
          !isLastPage && nextPageButton
        }
      </ul>
    </div>
  );
}
export default Pagination;
