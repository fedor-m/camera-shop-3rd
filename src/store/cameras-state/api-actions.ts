import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state';
import { Camera } from '../../types/camera';
import { Cameras } from '../../types/cameras';
import {
  APIRoute,
  SortParameter,
  OrderParameter,
  QueryParameter
} from '../../const';
import { Url } from '../../types/url';
import { Filter } from '../../types/filter';
import { checkFiltersInQuery } from '../../utils';

export const fetchCamerasAction = createAsyncThunk<
  Cameras,
  Url,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchCameras', async ({
  start,
  end,
  sort,
  order,
  priceGte,
  priceLte,
  category,
  types,
  levels
}, { extra: api }) => {
  let url = `${APIRoute.Cameras}?_start=${start}&_end=${end}`;
  if(sort)
  {
    let sortType = '';
    const isCorrectSortValue = () =>
      sort === SortParameter.Price || sort === SortParameter.Rating;
    const isCorrectOrderValue = () =>
      order === OrderParameter.Asc || order === OrderParameter.Desc;
    if (isCorrectSortValue()) {
      sortType = sort;
    }
    else if (!isCorrectSortValue() && isCorrectOrderValue()) {
      sortType = SortParameter.Price;
    }
    url += `&_sort=${sortType}`;
  }
  if(order)
  {
    const isCorrectOrderValue = () =>
      order === OrderParameter.Asc || order === OrderParameter.Desc;
    isCorrectOrderValue() ? url += `&_order=${order}` : url += '';
  }
  if(priceGte)
  {
    isNaN(priceGte)
      ||
      priceGte <= 0
      ||
      (Number(priceLte) > 0 && priceGte > Number(priceLte))
      ?
      url += ''
      :
      url += `&price_gte=${priceGte}`;
  }
  if(priceLte)
  {
    isNaN(priceLte)
    ||
    priceLte <= 0
    ||
    (Number(priceGte) > 0 && priceLte < Number(priceGte))
      ? url += '' : url += `&price_lte=${priceLte}`;
  }
  url = checkFiltersInQuery(url, category, types, levels);
  const { data, headers } = await api.get<Camera[]>(url);
  const result: Cameras = {
    items: data,
    total: Number(headers['x-total-count']),
  };
  return result;
});

export const fetchCamerasByNameAction = createAsyncThunk<
  Camera[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchCamerasByName', async (name: string, { extra: api }) => {
  const { data } = await api.get<Camera[]>(
    `${APIRoute.Cameras}?name_like=${name}`
  );
  return data;
});

export const fetchPricesAction = createAsyncThunk<
  number[],
  Filter,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchPrices', async ({
  category,
  types,
  levels
}, { extra: api }) => {
  const url = `${checkFiltersInQuery(`${APIRoute.Cameras}?`, category, types, levels)}&_sort=price`.replace(QueryParameter.Empty,QueryParameter.First);
  const { data } = await api.get<Camera[]>(url);
  return [data[0].price, data[data.length - 1].price];
});
