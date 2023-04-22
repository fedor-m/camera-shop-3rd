import {
  useState,
  ChangeEvent,
  KeyboardEvent
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector';
import {
  getMinPrice,
  getMaxPrice
} from '../../store/cameras-state/selectors';
import {
  CATEGORIES,
  CameraCategory,
  CameraType,
  LEVELS,
  PageSetting,
  QueryParameter
} from '../../const';
import {
  isArrowDownKey,
  isArrowUpKey
} from '../../utils';

function FilterForm(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const setFilters = () => {
    searchParams.delete(QueryParameter.Page);
    setSearchParams(searchParams);
  };
  const minPrice = useAppSelector(getMinPrice);
  const maxPrice = useAppSelector(getMaxPrice);
  const priceGte = searchParams.get(QueryParameter.PriceGte);
  const priceLte = searchParams.get(QueryParameter.PriceLte);
  const stateMinPrice = (
    !priceGte
      ||
      isNaN(Number(priceGte))
      ||
      Number(priceGte) <= 0
      ||
      ((Number(priceGte) < (Number(minPrice)) && (Number(minPrice) > 0)))
      ||
      ((Number(priceGte) > (Number(maxPrice)) && (Number(maxPrice) > 0)))
      ?
      null
      :
      Number(priceGte)
  );
  const [newPriceGte, setNewPriceGte] = useState(stateMinPrice);
  const handlePriceGteChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPriceGte(Number(event.target.value));
  };
  const handleSendPriceGte = () => {
    if (
      (Number(newPriceGte) < Number(minPrice))
    ) {
      setNewPriceGte(minPrice);
      searchParams.set(QueryParameter.PriceGte, String(minPrice));
    }
    else if (
      Number(newPriceGte) > Number(maxPrice)
    ) {
      setNewPriceGte(maxPrice);
      searchParams.set(QueryParameter.PriceGte, String(maxPrice));
    }
    else if (
      Number(newPriceLte) > 0 && Number(newPriceGte) > Number(newPriceLte)
    ) {
      setNewPriceGte(newPriceLte);
      searchParams.set(QueryParameter.PriceGte, String(newPriceLte));
    }
    else {
      setNewPriceGte(newPriceGte);
      searchParams.set(QueryParameter.PriceGte, String(newPriceGte));
    }
    setFilters();
  };
  const stateMaxPrice = (
    !priceLte
      ||
      isNaN(Number(priceLte))
      ||
      Number(priceLte) <= 0
      ||
      ((Number(priceLte) > Number(maxPrice)) && Number(maxPrice) > 0)
      ||
      (Number(priceLte) < Number(priceGte))
      ?
      null
      :
      Number(priceLte)
  );
  const [newPriceLte, setNewPriceLte] = useState<number | null>(stateMaxPrice);
  const handlePriceLteChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPriceLte(Number(event.target.value));
  };
  const handleSendPriceLte = () => {
    if (
      (Number(newPriceLte) < Number(minPrice))
    ) {
      setNewPriceLte(minPrice);
      searchParams.set(QueryParameter.PriceLte, String(minPrice));
    }
    else if (
      Number(newPriceLte) > Number(maxPrice)
    ) {
      setNewPriceGte(maxPrice);
      searchParams.set(QueryParameter.PriceLte, String(maxPrice));
    }
    else if (
      Number(newPriceLte) < Number(newPriceGte)
    ) {
      setNewPriceGte(newPriceLte);
      searchParams.set(QueryParameter.PriceLte, String(newPriceGte));
    }
    else {
      setNewPriceLte(newPriceLte);
      searchParams.set(QueryParameter.PriceLte, String(newPriceLte));
    }
    setFilters();
  };
  const handleArrowKeysPriceGte = (event: KeyboardEvent<HTMLInputElement>) => {
    if (isArrowUpKey(event.key)) {
      setNewPriceGte(Number(newPriceGte) + PageSetting.Step);
    }
    else if (isArrowDownKey(event.key)) {
      setNewPriceGte(Number(newPriceGte) - PageSetting.Step);
    }
  };
  const handleArrowKeysPriceLte = (event: KeyboardEvent<HTMLInputElement>) => {
    if (isArrowUpKey(event.key)) {
      setNewPriceLte(Number(newPriceLte) + PageSetting.Step);
    }
    else if (isArrowDownKey(event.key)) {
      setNewPriceLte(Number(newPriceLte) - PageSetting.Step);
    }
  };
  const category = searchParams.get(QueryParameter.Category);
  const handleCheckCategory = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    if (checked) {
      searchParams.set(QueryParameter.Category, value);
      searchParams.delete(QueryParameter.Page);
      setSearchParams(searchParams);
    }
    else {
      searchParams.delete(QueryParameter.Category);
      searchParams.delete(QueryParameter.Page);
      setSearchParams(searchParams);
    }
  };
  const types = searchParams.getAll(QueryParameter.Type);
  const handleCheckTypes = (event: ChangeEvent<HTMLInputElement>) => {
    let updatedTypes: string[] = [];
    const { checked, value } = event.target;
    if (types && types.length > 0) {
      if (checked) {
        updatedTypes = [...types, value] as string[];
      }
      else {
        updatedTypes = [...types] as string[];
        updatedTypes.splice(types.indexOf(value), 1);
      }
    }
    else {
      if (checked) {
        updatedTypes.push(value);
      }
    }
    searchParams.delete(QueryParameter.Type);
    updatedTypes.forEach(
      (type) => searchParams.append(QueryParameter.Type, type)
    );
    setFilters();
  };
  const levels = searchParams.getAll(QueryParameter.Level);
  const handleCheckLevels = (event: ChangeEvent<HTMLInputElement>) => {
    let updatedLevels: string[] = [];
    const { checked, value } = event.target;
    if (levels && levels.length > 0) {
      if (checked) {
        updatedLevels = [...levels, value] as string[];
      }
      else {
        updatedLevels = [...levels] as string[];
        updatedLevels.splice(levels.indexOf(value), 1);
      }
    }
    else {
      if (checked) {
        updatedLevels.push(event.target.value);
      }
    }
    searchParams.delete(QueryParameter.Level);
    updatedLevels.forEach(
      (level) => searchParams.append(QueryParameter.Level, level)
    );
    setFilters();
  };
  const handleResetForm = () => {
    searchParams.delete(QueryParameter.PriceGte);
    searchParams.delete(QueryParameter.PriceLte);
    searchParams.delete(QueryParameter.Category);
    searchParams.delete(QueryParameter.Type);
    searchParams.delete(QueryParameter.Level);
    searchParams.delete(QueryParameter.Sort);
    searchParams.delete(QueryParameter.Order);
    searchParams.delete(QueryParameter.Page);
    setSearchParams(searchParams);
    setNewPriceGte(null);
    setNewPriceLte(null);
  };
  const typesList: {
    key: string;
    value: string;
  }[] = Object.entries(CameraType).map(([key, value]) => ({ key, value }));

  const categoriesInputs = CATEGORIES.map(
    (item) => (
      <div
        className="custom-checkbox catalog-filter__item"
        key={item.key}
      >
        <label>
          <input
            type="checkbox"
            name={item.key}
            value={item.value}
            onChange={handleCheckCategory}
            checked={category === item.value}
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">
            {item.text}
          </span>
        </label>
      </div>
    )
  );
  const typesInputs = typesList.map(
    (item) => (
      <div
        className="custom-checkbox catalog-filter__item"
        key={item.key}
      >
        <label>
          <input
            type="checkbox"
            name={item.key}
            value={item.value}
            onChange={handleCheckTypes}
            checked={types?.find((type) => type === item.value) === item.value}
            disabled={
              category === CameraCategory.Videocamera
              &&
              (item.value === CameraType.Film || item.value === CameraType.Snapshot)
            }
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">
            {item.value}
          </span>
        </label>
      </div>
    )
  );
  const levelsInputs = LEVELS.map(
    (item) => (
      <div
        className="custom-checkbox catalog-filter__item"
        key={item.key}
      >
        <label>
          <input
            type="checkbox"
            name={item.key}
            value={item.value}
            onChange={handleCheckLevels}
            checked={levels?.find((level) => level === item.value) === item.value}
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">
            {item.value}
          </span>
        </label>
      </div>
    ));
  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Цена, ₽</legend>
            <div className="catalog-filter__price-range">
              <div className="custom-input">
                <label>
                  <input
                    type="number"
                    name="gte"
                    placeholder={String(minPrice)}
                    onChange={handlePriceGteChange}
                    onBlur={handleSendPriceGte}
                    value={String(newPriceGte)}
                    onKeyDown={handleArrowKeysPriceGte}
                    step={PageSetting.Step}
                  />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input
                    type="number"
                    name="lte"
                    placeholder={String(maxPrice)}
                    onChange={handlePriceLteChange}
                    onBlur={handleSendPriceLte}
                    value={String(newPriceLte)}
                    onKeyDown={handleArrowKeysPriceLte}
                    step={PageSetting.Step}
                  />
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            {categoriesInputs}
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">
              Тип камеры
            </legend>
            {typesInputs}
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            {levelsInputs}
          </fieldset>
          <button
            className="btn catalog-filter__reset-btn"
            type="reset"
            onClick={handleResetForm}
          >
            Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}
export default FilterForm;
