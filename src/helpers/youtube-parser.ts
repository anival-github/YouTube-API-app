import { EmbedLinkType } from '../types/types';

const SEARCH_ID_PATTERN = /(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/;
const SEARC_TIMESTAMP_PATTERN = /t=([^#&\n\r]+)/g;

const getVideoId = (url: string) => {
  const arr = url.split(SEARCH_ID_PATTERN); // ["https://www.youtube.com/watch?", "v=", "6QjIHnb5Ivs&t=37"]
  const videoId = arr[2] === undefined ? arr[0] : arr[2].split(/[^\w-]/i)[0]; // "6QjIHnb5Ivs"
  return videoId;
};

const addTimeStamp = (link: string, bareEmbedLink: string): string => {
  const timeStampArr = link.match(SEARC_TIMESTAMP_PATTERN);
  let embedLink = bareEmbedLink;

  if (timeStampArr) {
    const timeStampForEmbedLink = timeStampArr[0].replace('t', '?start');
    embedLink += timeStampForEmbedLink;
  }

  return embedLink;
};

const getEmbedLinkById = (id: string) => `http://www.youtube.com/embed/${id}`;

export const getEmbedLinksFromData = (data: any): Array<EmbedLinkType> => {
  const embedLinks = data.items.map((val: any) => {
    const id = val.id.videoId;
    const embedLink = getEmbedLinkById(id);
    return { id, embedLink };
  });

  return embedLinks;
};

export const parseYouTubeLink = (query: string) => {
  const CHECK_EMBED_LINK_PATTERN = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(\S+)/g;

  const link = query.replace('feature=youtu.be#', '');
  const isValidLink = CHECK_EMBED_LINK_PATTERN.test(link);

  if (!isValidLink) {
    console.log('It is not a supported YouTube link');
    return null;
  }

  const videoId = getVideoId(link);
  const bareEmbedLink = getEmbedLinkById(videoId);
  const embedLink = addTimeStamp(link, bareEmbedLink);

  return { videoId, embedLink };
};
