import dayjs from 'dayjs';
import { Pages } from './types/pages';
import { Stars } from './types/stars';
import { Review } from './types/review';
import { Camera } from './types/camera';
import {
  PageNumber,
  PageSetting,
  DateTime,
  Rating,
  KeyCode,
  CameraCategory,
  CameraType,
  CameraLevel,
  PromoCode,
  Discount,
  LocalStorageParameter
} from './const';
import { CameraCount } from './types/camera-count';
export const getPageNumber = (page: number) =>
  (Number(page) > 0) ? Number(page) : PageNumber.First;
export const getPagesNumber = (total: number) =>
  total % PageSetting.CardsNumber === 0
    ? total / PageSetting.CardsNumber
    : Math.ceil(total / PageSetting.CardsNumber);
export const getItemNumbersToPage = (page: number, total: number): Pages =>
{
  const start = PageSetting.CardsNumber * (page - 1);
  const end = start + PageSetting.CardsNumber;
  return {
    start,
    end: end > total ? total : end
  };
};
export const getStarsInRating = (rating: number): Stars => ({
  gold: [...Array.from({ length: rating }).keys()],
  grey: [...Array.from({ length: Rating.Max - rating }).keys()],
});
export const getDateFormatBasic = (date: string): string =>
  dayjs(date).format(DateTime.FormatBasic);
export const getDateFormatRU = (date: string): string => {
  require('dayjs/locale/ru');
  return dayjs(date).locale(DateTime.Locale).format(DateTime.FormatRu);
};
export const getSortedReviews = (reviews: Review[] | null): Review[] | null => {
  if (!reviews) {
    return null;
  }
  return [...reviews].sort((a, b) =>
    dayjs(a.createAt).isBefore(dayjs(b.createAt)) ? 1 : -1
  );
};
export const isEscKey = (key: string) =>
  key === KeyCode.Escape || key === KeyCode.Esc;
export const isEnterKey = (key:string) =>
  key === KeyCode.Enter;
export const isArrowDownKey = (key: string) =>
  key === KeyCode.ArrowDown;
export const isArrowUpKey = (key: string) =>
  key === KeyCode.ArrowUp;
export const scrollToTop = (element: HTMLElement | Window) => {
  element.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
export const checkFiltersInQuery = (
  url: string,
  category?: string|null,
  types?: string[]|null,
  levels?:string[]|null
) =>
{
  if(category)
  {
    const isCategoryValueCorrect = () =>
      String(category) === CameraCategory.Photocamera || String(category) === CameraCategory.Videocamera;
    isCategoryValueCorrect() ? url += `&category=${category}` : url += '';
  }
  if(types)
  {
    const filterTypes = types.filter((type) => Object.values(CameraType).includes(type as CameraType));
    filterTypes.length > 0 ?
      filterTypes.forEach((type)=>
      {
        url += `&type=${String(type)}`;
      })
      :
      url += '';
  }
  if(levels)
  {
    const filterLevels = levels?.filter((level) => Object.values(CameraLevel).includes(level as CameraLevel));
    filterLevels.length > 0 ?
      filterLevels.forEach((level)=>
      {
        url += `&level=${String(level)}`;
      })
      :
      url += '';
  }
  return url;
};
export const getBookedCamerasFromLocalStorage = () : Camera[] =>
  JSON.parse(
    localStorage.getItem(LocalStorageParameter.BookedCameras)
    ||
    LocalStorageParameter.BlankArray
  ) as Camera[];
export const addCameraToCart = (cameras: Camera[], camera: Camera) : Camera[] =>
  [...cameras, camera];
export const removeCameraFromCart = (cameras: Camera[], id: number): Camera[] =>
  cameras.filter((camera) => camera.id !== id);
export const decreaseCameraCountInCart = (cameras: Camera[], id: number): Camera[] => {
  const itemToRemove = cameras
    .map((camera, index) => ({...camera, index}))
    .filter((camera) => camera.id === id).at(-1);
  return cameras.filter(
    (_, index) => index !== itemToRemove?.index
  );
};
export const setCameraCountInCart = (cameras: Camera[], cameraCount: CameraCount ): Camera[] => {
  const currentCamerasList = cameras.filter(
    (camera) => camera.id === cameraCount.id
  );
  let newCamerasList = new Array<Camera>();
  if(currentCamerasList.length < cameraCount.count)
  {
    const itemsToAdd = new Array<Camera>(cameraCount.count - currentCamerasList.length).fill(currentCamerasList[0]);
    newCamerasList = cameras.concat(itemsToAdd);
  }
  else {
    const indexedCameras = cameras.map((camera, index) => ({...camera, index}));
    const sameIndexedCameras = indexedCameras.filter((camera) => camera.id === cameraCount.id);
    const itemsToRemove = sameIndexedCameras.slice(-(sameIndexedCameras.length - cameraCount.count)).map((item) => item.index);
    newCamerasList = cameras.filter((_, index) => !itemsToRemove.includes(index));
  }
  return newCamerasList;
};
export const isPromoCodeCorrect = (promoCode: string|null): boolean =>
  promoCode === PromoCode.Camera333
    ||
    promoCode === PromoCode.Camera444
    ||
    promoCode === PromoCode.Camera555;
export const isDiscountCorrect = (discount: number|null): boolean =>
  Number(discount) >= Discount.Min
    &&
    Number(discount) <= Discount.Max;
