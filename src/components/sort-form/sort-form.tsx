import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  SortParameter,
  OrderParameter,
  QueryParameter,
} from '../../const';

function SortForm(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get(QueryParameter.Sort);
  const order = searchParams.get(QueryParameter.Order);

  const handleFieldSortTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    searchParams.set(QueryParameter.Sort, value);
    searchParams.delete(QueryParameter.Page);
    setSearchParams(searchParams);
  };
  const handleFieldSortOrderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    searchParams.set(QueryParameter.Order, value);
    searchParams.delete(QueryParameter.Page);
    setSearchParams(searchParams);
  };
  const checkSortPriceValue = () => sort === SortParameter.Price || ((!sort || (sort !== SortParameter.Price && sort !== SortParameter.Rating)) && (order === OrderParameter.Asc || order === OrderParameter.Desc));
  const checkOrderAscValue = () => order === OrderParameter.Asc || ((sort === SortParameter.Price || sort === SortParameter.Rating) && (!order || (order !== OrderParameter.Asc && order !== OrderParameter.Desc)));
  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name="sort"
                value="price"
                onChange={handleFieldSortTypeChange}
                checked={checkSortPriceValue()}
              />
              <label
                htmlFor="sortPrice"
                className={sort === SortParameter.Price ? 'btn btn--purple' : 'btn btn--transparent'}
              >
                по цене
              </label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                value="rating"
                onChange={handleFieldSortTypeChange}
                checked={sort === SortParameter.Rating}
              />
              <label
                htmlFor="sortPopular"
                className={sort === SortParameter.Rating ? 'btn btn--purple' : 'btn btn--transparent'}
              >
                по популярности
              </label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="order"
                value="asc"
                aria-label="По возрастанию"
                onChange={handleFieldSortOrderChange}
                checked={checkOrderAscValue()}
              />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                name="order"
                value="desc"
                aria-label="По убыванию"
                onChange={handleFieldSortOrderChange}
                checked={order === OrderParameter.Desc}
              />
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default SortForm;
