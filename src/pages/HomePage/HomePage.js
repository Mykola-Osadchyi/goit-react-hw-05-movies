import { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import useStyles from '../../services/stylesPagination';
import { getTrending } from '../../services/fetchMovies-api';
import s from './HomePage.module.css';

export default function HomePage() {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [trendingList, setTrendingList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  const page = new URLSearchParams(location.search).get('page') ?? 1;

  useEffect(() => {
    getTrending(page).then(({ results, total_pages }) => {
      setTrendingList(results);
      setTotalPage(total_pages);
    });
  }, [page]);

  const onHandlePage = (event, page) => {
    history.push({ ...location, search: `page=${page}` });
  };

  return (
    <>
      <h3 className={s.title}>Trending today</h3>
      <ul className={s.list}>
        {trendingList.map(movie => (
          <li key={movie.id}>
            <Link
              className={s.item}
              to={{
                pathname: `movies/${movie.id}`,
                state: { from: location },
              }}
            >
              <span>{movie.title}</span>
              {movie.release_date ? (
                <span className={s.year}>
                  ({movie.release_date.slice(0, 4)})
                </span>
              ) : (
                <span className={s.year}>(no info)</span>
              )}
            </Link>
          </li>
        ))}
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
