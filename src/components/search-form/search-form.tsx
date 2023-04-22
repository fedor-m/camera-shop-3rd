import {
  useState,
  ChangeEvent,
  FormEvent,
  MouseEvent,
  FocusEvent,
  useRef,
  useEffect
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { fetchCamerasByNameAction } from '../../store/cameras-state/api-actions';
import {
  getFoundCameras,
  getFoundCamerasLoadingStatus
} from '../../store/cameras-state/selectors';
import {
  isEscKey,
  isEnterKey,
  isArrowDownKey,
  isArrowUpKey,
  scrollToTop
} from '../../utils';
import {
  AppRoute,
  PageSetting
} from '../../const';
import Loader from '../loader/loader';

function SearchForm(): JSX.Element {
  useEffect(() => {
    const handleArrowKeys = (event: KeyboardEvent) => {
      if (isArrowDownKey(event.key) || isArrowUpKey(event.key)) {
        event.preventDefault();
      }
    };
    let isMounted = true;
    if (isMounted) {
      document.body.addEventListener('keydown', handleArrowKeys);
    }
    return () => {
      isMounted = false;
      document.body.removeEventListener('keydown', handleArrowKeys);
    };
  }, []);
  const searchResultsList = useRef<HTMLUListElement>(null);
  const dispatch = useAppDispatch();
  const foundCameras = useAppSelector(getFoundCameras);
  const searchResultsToFocus = useRef<(HTMLLIElement | null)[]>([]);
  const areFoundCamerasLoading = useAppSelector(getFoundCamerasLoadingStatus);
  const [isOpened, setOpened] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();
  const handleResetForm = () => {
    setSearchString('');
    setOpened(false);
  };
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    if (query.length > 0) {
      setSearchString(query);
      dispatch(fetchCamerasByNameAction(encodeURIComponent(query)));
      setOpened(true);
      searchResultsList.current && scrollToTop(searchResultsList.current);
    }
    else {
      handleResetForm();
    }
  };
  const handleSearchResultKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (isEnterKey(event.key)) {
      redirectToSelectedPage(event.target);
    }
  };
  const handleEscKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isEscKey(event.key)) {
      handleResetForm();
    }
  };
  const handleSearchResultClick = (event: MouseEvent<HTMLLIElement>) => {
    redirectToSelectedPage(event.target);
  };
  const redirectToSelectedPage = (target: EventTarget) => {
    const searchResult = target as HTMLLIElement;
    const id = searchResult.getAttribute('data-camera-id') as string;
    navigate(`${AppRoute.Item}/${id}`);
    handleResetForm();
  };
  const handleSubmitForm = (event: FormEvent) => {
    event.preventDefault();
  };
  const handleSearchResultsBlur = () => {
    setActiveIndex(-1);
  };
  const handleSearchResultsFocus = (event: FocusEvent<HTMLUListElement>) => {
    scrollToTop(event.target);
  };
  const handleSearchResultElementFocus = (event: FocusEvent<HTMLLIElement>) => {
    setActiveIndex(Number(event.target.getAttribute('data-index')));
  };
  const handleArrowKeysDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    let newItem = activeIndex;
    if (isArrowDownKey(event.key)) {
      newItem = activeIndex + 1;
    }
    else if (isArrowUpKey(event.key)) {
      newItem = activeIndex - 1;
    }
    if (foundCameras && newItem >= 0 && newItem < foundCameras.length) {
      searchResultsToFocus.current[newItem]?.focus();
    }
  };

  return (
    <div className={`form-search${isOpened ? ' list-opened' : ''}`}>
      <form onSubmit={handleSubmitForm}>
        <label>
          <svg
            className="form-search__icon"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-lens" />
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            value={searchString}
            onChange={handleSearch}
            onKeyDown={handleEscKey}
          />
        </label>
        {foundCameras && (
          <ul
            className={`form-search__select-list${foundCameras.length > PageSetting.MaxResultsListLength ? ' scroller' : ''}`}
            {...(foundCameras
              ? {
                onBlur: handleSearchResultsBlur,
                onFocus: handleSearchResultsFocus,
                ref: searchResultsList,
                onKeyDown: handleArrowKeysDown,
              }
              : {})}
          >
            {areFoundCamerasLoading && <Loader />}
            {foundCameras.length > 0 ? (
              foundCameras.map((camera, index) => (
                <li
                  key={camera.id}
                  className="form-search__select-item"
                  role="link"
                  tabIndex={0}
                  data-camera-id={camera.id}
                  data-index={index}
                  onClick={handleSearchResultClick}
                  onKeyDown={handleSearchResultKeyDown}
                  onFocus={handleSearchResultElementFocus}
                  ref={(ref) => { searchResultsToFocus.current[index] = ref; }}
                >
                  {camera.name}
                </li>
              ))
            ) : (
              <li className="form-search__select-item">Нет результатов</li>
            )}
          </ul>
        )}
      </form>
      <button
        className="form-search__reset"
        type="reset"
        onClick={handleResetForm}
      >
        <svg
          width="10"
          height="10"
          aria-hidden="true"
        >
          <use xlinkHref="#icon-close" />
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}
export default SearchForm;
