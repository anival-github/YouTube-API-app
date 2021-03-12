const SET_APP_REGIME = 'talenya-app/video-reducer/SET_APP_REGIME';

const initialState = {
  isSearchEnabled: false,
};

export type InitialStateType = typeof initialState;

type ActionTypes = SetAppRegimeType;

const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case SET_APP_REGIME:
      return {
        ...state,
        isSearchEnabled: action.isSearchEnabled,
      };
    default:
      return state;
  }
};

type SetAppRegimeType = {
  type: typeof SET_APP_REGIME,
  isSearchEnabled: boolean,
};

export const setAppRegime = (isSearchEnabled: boolean): SetAppRegimeType => ({
  type: SET_APP_REGIME,
  isSearchEnabled,
});

export default appReducer;
