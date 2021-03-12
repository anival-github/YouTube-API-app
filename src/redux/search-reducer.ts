import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'react';
import { getEmbedLinksFromData } from '../helpers/youtube-parser';
import youtubeAPI from '../api/youtube-api';
import { AppStateType } from './store';
import { EmbedLinkType } from '../types/types';

const SET_CURRENT_SEARCH_HOST = 'talenya-app/video-reducer/SET_CURRENT_SEARCH_HOST';
const SET_SEARCH_RESULTS = 'talenya-app/video-reducer/SET_SEARCH_RESULTS';

const YOU_TUBE = 'YouTube';

const initialState = {
  searchHosts: [YOU_TUBE] as Array<string>,
  currentSearchHost: YOU_TUBE,
  searchResults: null as any,
  searchEmbedLinks: [] as Array<EmbedLinkType>,
};

export type InitialStateType = typeof initialState;

type ActionTypes =
  | SetSearchResults
  | SetCurrentSearchHostType;

const searchReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case SET_CURRENT_SEARCH_HOST:
      return {
        ...state,
        currentSearchHost: action.host,
      };
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.searchData,
        searchEmbedLinks: action.embedLinks,
      };
    default:
      return state;
  }
};

type SetCurrentSearchHostType = {
  type: typeof SET_CURRENT_SEARCH_HOST,
  host: string,
};

export const setCurrentSearchHost = (host: string): SetCurrentSearchHostType => ({
  type: SET_CURRENT_SEARCH_HOST,
  host,
});

type SetSearchResults = {
  type: typeof SET_SEARCH_RESULTS,
  searchData: any,
  embedLinks: Array<EmbedLinkType>,
};

export const setSearchResults = (
  searchData: any, embedLinks: Array<EmbedLinkType>,
): SetSearchResults => ({
  type: SET_SEARCH_RESULTS,
  searchData,
  embedLinks,
});

export type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>;
type DispatchType = Dispatch<ActionTypes>;

const searchVideo = async (
  query: string, dispatch: DispatchType, APImethod: any, getEmbedLinks: any,
): Promise<void> => {
  const searchData = await APImethod(query);
  const embedLinks = getEmbedLinks(searchData);
  dispatch(setSearchResults(searchData, embedLinks));
};

export const processYouTubeRequest = (query: string, dispatch: DispatchType): void => {
  const APImethod = youtubeAPI.searchVideosByQuery.bind(youtubeAPI);
  searchVideo(query, dispatch, APImethod, getEmbedLinksFromData);
};

export const processRequest = (query: string): ThunkType => (dispatch, getState): void => {
  const { currentSearchHost } = getState().search;

  switch (currentSearchHost) {
    case YOU_TUBE:
      processYouTubeRequest(query, dispatch);
      return;
    default:
      throw new Error('Choose valid video provider');
  }
};

export default searchReducer;
