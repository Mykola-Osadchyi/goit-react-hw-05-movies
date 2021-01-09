import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { searchMovies } from '../../services/fetchMovies-api';

import SearchBar from '../Searchbar/Searchbar';
import makeImagePath from '../../services/makeImagePath';
import s from './MoviesPage.module.css';

export default function MoviesPage() {
  const { url } = useRouteMatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const handleFormSubmit = query => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (!searchQuery) return;
    // setMovies([]);
    searchMovies(searchQuery, pageNumber).then(results => {
      console.log('movieList', results);
      if (results.length === 0) {
        toast.error('Movies not found');
      } else {
        setMovies(results);
      }
    });
  }, [searchQuery]);

  return (
    <>
      <h3>Search Movies</h3>
      <SearchBar onSubmit={handleFormSubmit} />
      <ul className={s.movieGallery}>
        {movies.map(movie => {
          const poster = makeImagePath(movie.poster_path, 'w185');
          return (
            <li key={movie.id} className={s.movieCard}>
              <Link to={`${url}/${movie.id}`}>
                <img src={poster} alt={movie.title} width="94" />
                <span className={s.movieTitle}>{movie.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
