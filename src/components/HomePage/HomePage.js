import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTrending } from '../../services/fetchMovies-api';

export default function HomePage() {
  const [trendingList, setTrendingList] = useState([]);

  useEffect(() => {
    getTrending().then(results => {
      setTrendingList(results);
    });
  }, []);

  console.log('trendingList', trendingList);

  return (
    <>
      <h3>Tranding today</h3>
      <ul className="HomePage">
        {trendingList.map(movie => (
          <li key={movie.id} className="HomePage">
            <Link to={`movies/${movie.id}`}>
              <span>{movie.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
