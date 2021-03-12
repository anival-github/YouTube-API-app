import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'react';
import { parseYouTubeLink } from '../helpers/youtube-parser';
import youtubeAPI from '../api/youtube-api';
import { AppStateType } from './store';

const SET_EMBED_LINK = 'talenya-app/video-reducer/SET_EMBED_LINK';
const SET_CURRENT_PARSE_LINK_HOST = 'talenya-app/video-reducer/SET_CURRENT_PARSE_LINK_HOST';
const SET_VIDEO_DATA = 'talenya-app/video-reducer/SET_VIDEO_DATA';

const YOU_TUBE = 'YouTube';

const initialState = {
  linksSupportedHosts: [YOU_TUBE] as Array<string>,
  currentLinksHost: YOU_TUBE,
  choosenVideoEmbedLink: '',
  choosenVideoData: null as any,
};

export type InitialStateType = typeof initialState;

type ActionTypes =
  | SetEmbedLinkType
  | SetCurrentParseLinkHostType
  | SetVideoDataType;

const linkReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case SET_EMBED_LINK:
      return {
        ...state,
        choosenVideoEmbedLink: action.link,
      };
    case SET_CURRENT_PARSE_LINK_HOST:
      return {
        ...state,
        currentLinksHost: action.host,
      };
    case SET_VIDEO_DATA:
      return {
        ...state,
        choosenVideoData: action.videoData,
      };
    default:
      return state;
  }
};

type SetEmbedLinkType = {
  type: typeof SET_EMBED_LINK,
  link: string,
};

export const setEmbedLink = (link: string): SetEmbedLinkType => ({
  type: SET_EMBED_LINK,
  link,
});

type SetCurrentParseLinkHostType = {
  type: typeof SET_CURRENT_PARSE_LINK_HOST,
  host: string,
};

export const setCurrentParseLinkHost = (host: string): SetCurrentParseLinkHostType => ({
  type: SET_CURRENT_PARSE_LINK_HOST,
  host,
});

type SetVideoDataType = {
  type: typeof SET_VIDEO_DATA,
  videoData: any,
};

export const setVideoData = (videoData: any): SetVideoDataType => ({
  type: SET_VIDEO_DATA,
  videoData,
});

export type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>;
type DispatchType = Dispatch<ActionTypes>;

const getVideoInfo = async (
  videoId: string, embedLink: string, dispatch: DispatchType, APImethod: any,
): Promise<void> => {
  const videoData = await APImethod(videoId);
  dispatch(setVideoData(videoData));
  dispatch(setEmbedLink(embedLink));
};

export const processYouTubeRequest = (query: string, dispatch: DispatchType): void => {
  const parsedInfo = parseYouTubeLink(query);

  if (!parsedInfo) {
    alert('Sorry, this type of link is not supported');
  } else {
    const APImethod = youtubeAPI.findVideoById.bind(youtubeAPI);
    getVideoInfo(parsedInfo.videoId, parsedInfo.embedLink, dispatch, APImethod);
  }
};

export const processRequest = (query: string): ThunkType => (dispatch, getState): void => {
  const { currentLinksHost } = getState().link;

  switch (currentLinksHost) {
    case YOU_TUBE:
      processYouTubeRequest(query, dispatch);
      return;
    default:
      throw new Error('Choose valid video provider');
  }
};

export const chooseVideo = (
  id: string, embedLink: string,
): ThunkType => (dispatch): void => {
  dispatch(setEmbedLink(embedLink));
};

export default linkReducer;
