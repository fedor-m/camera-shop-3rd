import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { Camera } from '../../types/camera';
import { Review } from '../../types/review';

export const getSelectedCamera = (state: State): null | Camera =>
  state[NameSpace.Item].selectedCamera;
export const getSelectedCameraLoadingStatus = (state: State): boolean =>
  state[NameSpace.Item].isSelectedCameraLoading;
export const getSelectedCameraLoadingError = (state: State): boolean =>
  state[NameSpace.Item].hasSelectedCameraLoadingError;
export const getSimilarItems = (state: State): null | Camera[] =>
  state[NameSpace.Item].similarItems;
export const getSimilarItemsLoadingStatus = (state: State): boolean =>
  state[NameSpace.Item].areSimilarItemsLoading;
export const getReviews = (state: State): null | Review[] =>
  state[NameSpace.Item].reviews;
export const getReviewsLoadingStatus = (state: State): boolean =>
  state[NameSpace.Item].areReviewsLoading;
export const getReviewFormBlockedStatus = (state: State): boolean =>
  state[NameSpace.Item].isReviewFormBlocked;
export const getAddedReview = (state: State): null | Review =>
  state[NameSpace.Item].addedReview;
