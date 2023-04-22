import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { Camera } from '../../types/camera';

export const getCameras = (state: State): null | Camera[] =>
  state[NameSpace.Cameras].cameras;
export const getCamerasLoadingStatus = (state: State): boolean =>
  state[NameSpace.Cameras].areCamerasLoading;
export const getCamerasTotalCount = (state: State): null | number =>
  state[NameSpace.Cameras].total;
export const getFoundCameras = (state: State): undefined | Camera[] =>
  state[NameSpace.Cameras].foundCameras;
export const getFoundCamerasLoadingStatus = (state: State): boolean =>
  state[NameSpace.Cameras].areFoundCamerasLoading;
export const getMinPrice = (state: State): null | number =>
  state[NameSpace.Cameras].minPrice;
export const getMaxPrice = (state: State): null | number =>
  state[NameSpace.Cameras].maxPrice;
