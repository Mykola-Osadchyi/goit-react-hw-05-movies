import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'e625f588d36bd893fee8ddeff8fb6e52';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key: API_KEY,
  // image_type: 'photo',
  // orientation: 'horizontal',
  // per_page: 12,
};

const fetchMoviesGetTrending = async () => {
  try {
    const { data } = await axios.get('/trending/movie/day');
    console.log('results', data.results);
    return data.results;
  } catch (error) {
    console.log('error:', error);
    return [];
  }
};

// const fetchMoviesGetTrending2 = async (page = 1) => {
//   const { data } = await axios.get(`/trending/all/day?page=${page}`);
//   return data;
// };

const fetchMoviesGetSearch = async (search, page = 1) => {
  const { data } = await axios.get(
    `/search/movie?language=en-US&page=${page}&include_adult=false&query=${search}`,
  );
  return data;
};

const fetchMoviesGetDetails = async movie_id => {
  const { data } = await axios.get(`/movie/${movie_id}?language=en-US`);
  return data;
};

const fetchMoviesGetActors = async movie_id => {
  const { data } = await axios.get(`/movie/${movie_id}/credits?language=en-US`);
  return data;
};

const fetchMoviesGetReviews = async (movie_id, page = 1) => {
  const { data } = await axios.get(
    `/movie/${movie_id}/reviews?language=en-US&page=${page}`,
  );
  return data;
};

export {
  fetchMoviesGetTrending,
  fetchMoviesGetSearch,
  fetchMoviesGetDetails,
  fetchMoviesGetActors,
  fetchMoviesGetReviews,
};

// const API = {
//   getTrending,
//   searchMovies,
//   getMovieDetails,
//   getMovieCredits,
//   getMovieReviews,
// };
