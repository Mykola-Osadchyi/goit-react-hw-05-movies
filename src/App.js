import { lazy, Suspense, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addBackToTop } from 'vanilla-back-to-top';
import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';
import LoaderPage from './components/Loader/Loader';

const HomePage = lazy(() =>
  import('./pages/HomePage/HomePage.js' /* webpackChunkName: "HomePage" */),
);
const MoviesPage = lazy(() =>
  import(
    './pages/MoviesPage/MoviesPage.js' /* webpackChunkName: "MoviesPage" */
  ),
);
const MovieDetailsPage = lazy(() =>
  import(
    './pages/MovieDetailsPage/MovieDetailsPage.js' /* webpackChunkName: "MovieDetailsPage" */
  ),
);
const PageNotFound = lazy(() =>
  import(
    './pages/PageNotFound/PageNotFound' /* webpackChunkName: "PageNotFound" */
  ),
);

export default function App() {
  useEffect(() => {
    addBackToTop({
      backgroundColor: '#0a96f3',
    });
  }, []);

  return (
    <Container>
      <AppBar />
      <Suspense fallback={<LoaderPage />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <MoviesPage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      </Suspense>
      <ToastContainer autoClose={3000} />
    </Container>
  );
}
