import { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import useStyles from '../../services/stylesPagination';
import { getTrending } from '../../services/fetchMovies-api';

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
      <h3>Tranding today</h3>
      <ul className="HomePage">
        {trendingList.map(movie => (
          <li key={movie.id} className="HomePage">
            <Link
              to={{
                pathname: `movies/${movie.id}`,
                state: { from: location },
              }}
            >
              <span>
                {movie.title} ({movie.release_date.slice(0, 4)})
              </span>
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
