import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Pagination } from '@material-ui/lab';
import useStyles from '../../services/stylesPagination';
import { searchMovies } from '../../services/fetchMovies-api';

import SearchBar from '../Searchbar/Searchbar';
// import makeImagePath from '../../services/makeImagePath';
// import s from './MoviesPage.module.css';

export default function MoviesPage() {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const { url } = useRouteMatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  const page = new URLSearchParams(location.search).get('page') ?? 1;

  useEffect(() => {
    if (location.search === '') {
      return;
    }

    const newSearch = new URLSearchParams(location.search).get('query');
    setSearchQuery(newSearch, page);
  }, [location.search, page]);

  useEffect(() => {
    if (!searchQuery) return;
    searchMovies(searchQuery, page).then(({ results, total_pages }) => {
      if (results.length === 0) {
        toast.error('Movies not found');
      } else {
        setMovies(results);
        setTotalPage(total_pages);
      }
    });
  }, [searchQuery, page]);

  const handleFormSubmit = newQuery => {
    if (searchQuery === newQuery) {
      return;
    }
    setSearchQuery(newQuery);
    history.push({ ...location, search: `query=${newQuery}&page=1` });
  };

  const onHandlePage = (event, page) => {
    history.push({ ...location, search: `query=${searchQuery}&page=${page}` });
  };

  return (
    <>
      <SearchBar onSubmit={handleFormSubmit} />
      {/* <ul className={s.movieGallery}> */}
      <ul>
        {movies.map(movie => {
          // const poster = makeImagePath(movie.poster_path, 'w185');
          return (
            // <li key={movie.id} className={s.movieCard}>
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `${url}/${movie.id}`,
                  state: { from: location },
                }}
              >
                {/* <img src={poster} alt={movie.title} width="94" /> */}
                {/* <span className={s.movieTitle}>{movie.title}</span> */}
                <span>
                  {movie.title} ({movie.release_date.slice(0, 4)})
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      {totalPage > 1 && (
        <Pagination
          className={classes.root}
          count={totalPage}
          onChange={onHandlePage}
          page={Number(page)}
          showFirstButton
          showLastButton
          size="large"
        />
      )}
    </>
  );
}
