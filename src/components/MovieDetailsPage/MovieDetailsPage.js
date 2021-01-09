import { useState, useEffect } from 'react';
import {
  useParams,
  NavLink,
  useRouteMatch,
  Switch,
  Route,
} from 'react-router-dom';
import { getMovieDetails } from '../../services/fetchMovies-api';
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';
import makeImagePath from '../../services/makeImagePath';
import s from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const { url } = useRouteMatch();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(movieId).then(setMovie);
    console.log('movie', movie);
  }, [movieId]);

  return (
    <>
      {movie && (
        <>
          <div className={s.movieWraper}>
            <img
              src={makeImagePath(movie.poster_path, 'w185')}
              alt={movie.title}
              width="185"
            />
            <div className={s.movieDescription}>
              <h4 className={s.movieTitle}>
                {movie.title} ({movie.release_date.slice(0, 4)})
              </h4>
              <span className={s.movieDescriptionItem}>Popularity:</span>
              <span>{movie.popularity}</span>
              <span className={s.movieDescriptionItem}>Overview:</span>
              <p>{movie.overview}</p>
              <span className={s.movieDescriptionItem}>Genres:</span>
              <ul className={s.genreList}>
                {movie.genres.map(genre => (
                  <li key={genre.id} className="genreItem">
                    <span>{genre.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <h5>Additional information</h5>
          <ul className="moreMovieInfo">
            <NavLink
              to={`${url}/cast`}
              className={s.link}
              activeClassName={s.active}
            >
              Cast
            </NavLink>
            <NavLink
              to={`${url}/reviews`}
              className={s.link}
              activeClassName={s.active}
            >
              Reviews
            </NavLink>
          </ul>

          <Switch>
            <Route path={'/movies/:movieId/cast'}>
              <Cast />
            </Route>
            <Route path={'/movies/:movieId/reviews'}>
              <Reviews />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}
