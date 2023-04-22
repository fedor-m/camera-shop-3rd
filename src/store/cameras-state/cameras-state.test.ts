import {camerasState} from './cameras-state';
import {fetchCamerasAction} from './api-actions';
import {CamerasState} from '../../types/state';
import {makeFakeStateCameras} from '../../mocks/mocks';

const fakeStateCameras = makeFakeStateCameras();

describe('Reducer: offerProcess', () => {
  let state: CamerasState;

  beforeEach(() => {
    state = {
      cameras: null,
      total: null,
      areCamerasLoading: false,
      areFoundCamerasLoading: false,
      minPrice: null,
      maxPrice: null
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(camerasState.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('Action: fetchCamerasAction', () => {
    it('should update loading status to "true" if action pending', () => {
      expect(camerasState.reducer(state, {type: fetchCamerasAction.pending.type}))
        .toEqual({...state, areCamerasLoading: true});
    });

    it('should update loading status to "false" and loaded offers if action fulfilled', () => {
      expect(camerasState.reducer(state, {type: fetchCamerasAction.fulfilled.type, payload: fakeStateCameras}))
        .toEqual({...state, areCamerasLoading: false, cameras: fakeStateCameras.items, total: fakeStateCameras.total});
    });
  });
});
