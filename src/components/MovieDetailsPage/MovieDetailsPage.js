import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  NavLink,
  useRouteMatch,
  Switch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { getMovieDetails } from '../../services/fetchMovies-api';
import makeImagePath from '../../services/makeImagePath';
import LoaderPage from '../Loader/Loader';
import s from './MovieDetailsPage.module.css';

const Cast = lazy(() =>
  import('../Cast/Cast.js' /* webpackChunkName: "Cast" */),
);

const Reviews = lazy(() =>
  import('../Reviews/Reviews.js' /* webpackChunkName: "Reviews" */),
);

export default function MovieDetailsPage() {
  const location = useLocation();
  const history = useHistory();

  const { movieId } = useParams();
  const { url, path } = useRouteMatch();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  const handleGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      {movie && (
        <>
          <button type="button" onClick={handleGoBack}>
            Go back
          </button>
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
              to={{
                pathname: `${url}/cast`,
                state: { from: location?.state?.from ?? '/' },
              }}
              className={s.link}
              activeClassName={s.active}
            >
              Cast
            </NavLink>
            <NavLink
              to={{
                pathname: `${url}/reviews`,
                state: { from: location?.state?.from ?? '/' },
              }}
              className={s.link}
              activeClassName={s.active}
            >
              Reviews
            </NavLink>
          </ul>
          <Suspense fallback={<LoaderPage />}>
            <Switch>
              <Route path={`${path}/cast`}>
                <Cast />
              </Route>
              <Route path={`${path}/reviews`}>
                <Reviews />
              </Route>
            </Switch>
          </Suspense>
        </>
      )}
    </>
  );
}
