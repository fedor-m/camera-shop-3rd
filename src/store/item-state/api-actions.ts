import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state';
import { Camera } from '../../types/camera';
import { Review } from '../../types/review';
import { ReviewPost } from '../../types/review-post';
import { APIRoute } from '../../const';


export const fetchSelectedCameraAction = createAsyncThunk<
  Camera,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchSelectedCamera', async (cameraID, { extra: api }) => {
  const { data } = await api.get<Camera>(`${APIRoute.Cameras}/${cameraID}`);
  return data;
});
export const fetchSimilarItemsAction = createAsyncThunk<
  Camera[],
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchSimilarItems', async (cameraID, { extra: api }) => {
  const { data } = await api.get<Camera[]>(`${APIRoute.Cameras}/${cameraID}${APIRoute.Similar}`);
  return data;
});
export const fetchReviewsAction = createAsyncThunk<
  Review[],
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchReviews', async (cameraID, { extra: api }) => {
  const { data } = await api.get<Review[]>(`${APIRoute.Cameras}/${cameraID}${APIRoute.Reviews}`);
  return data;
});
export const sendReviewAction = createAsyncThunk<
  Review,
  ReviewPost,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/sendReviewAction', async ({ cameraId, userName, advantage, disadvantage, review, rating }, { extra: api }) => {
  const { data } = await api.post<Review>(`${APIRoute.Reviews}`, {
    cameraId, userName, advantage, disadvantage, review, rating
  });
  return data;
});
