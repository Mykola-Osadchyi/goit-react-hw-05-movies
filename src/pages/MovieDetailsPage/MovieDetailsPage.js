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
import { toast } from 'react-toastify';
import { getMovieDetails } from '../../services/fetchMovies-api';
import makeImagePath from '../../services/makeImagePath';
import LoaderPage from '../../components/Loader/Loader';
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
    getMovieDetails(movieId).then(movies => {
      if (movies.length === 0) {
        toast.error('Page not found');
        return;
      }
      setMovie(movies);
    });
  }, [movieId]);

  const handleGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      {movie && (
        <>
          <button type="button" onClick={handleGoBack} className={s.backBtn}>
            Go back
          </button>
          <div className={s.movieWraper}>
            <img
              src={makeImagePath(movie.poster_path, 'w500')}
              alt={movie.title}
              width="260"
            />
            <div className={s.movieDescription}>
              <h4 className={s.movieTitle}>
                {movie.title}
                {movie.release_date ? (
                  <span className={s.movieYear}>
                    ({movie.release_date.slice(0, 4)})
                  </span>
                ) : (
                  <span className={s.movieYear}>(no info)</span>
                )}
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
          <div className={s.add_info}>
            <h5 className={s.moreMovieInfo}>Additional information</h5>
            <ul className={s.moreInfoList}>
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
          </div>
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
