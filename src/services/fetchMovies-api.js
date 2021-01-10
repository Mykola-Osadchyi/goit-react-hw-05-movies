import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'e625f588d36bd893fee8ddeff8fb6e52';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key: API_KEY,
};

const getTrending = async page => {
  try {
    const { data } = await axios.get(`/trending/movie/day?&page=${page}`);
    return data;
  } catch (error) {
    console.log('error:', error);
    return [];
  }
};

const searchMovies = async (search, page) => {
  try {
    const { data } = await axios.get(
      `/search/movie?&query=${search}&page=${page}`,
    );
    return data;
  } catch (error) {
    console.log('error:', error);
    return [];
  }
};

const getMovieDetails = async movie_id => {
  try {
    const { data } = await axios.get(`/movie/${movie_id}?language=en-US`);
    return data;
  } catch (error) {
    console.log('error:', error);
    return [];
  }
};

const getMovieActors = async movie_id => {
  try {
    const { data } = await axios.get(
      `/movie/${movie_id}/credits?language=en-US`,
    );
    return data.cast;
  } catch (error) {
    console.log('error:', error);
    return [];
  }
};

const getMovieReviews = async movie_id => {
  try {
    const { data } = await axios.get(
      `/movie/${movie_id}/reviews?language=en-US`,
    );
    return data.results;
  } catch (error) {
    console.log('error:', error);
    return [];
  }
};

export {
  getTrending,
  searchMovies,
  getMovieDetails,
  getMovieActors,
  getMovieReviews,
};
