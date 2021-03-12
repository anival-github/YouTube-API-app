import axios from 'axios';

const API_KEY = 'AIzaSyDw-pSkDs0PC82RjKGJR069YNsLfT3E9Q8';
const maxResults = 25;

const instance = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3/',
});

const youtubeAPI = {
  searchVideosByQuery(query: string) {
    return instance.get(`search?part=snippet&maxResults=${maxResults}&q=${query}&key=${API_KEY}`)
      .then((response) => response.data);
  },

  findVideoById(id: string) {
    return instance.get(`videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${API_KEY}`)
      .then((response) => response.data);
  },
};

export default youtubeAPI;
