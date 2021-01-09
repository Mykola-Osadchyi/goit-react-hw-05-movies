import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../services/fetchMovies-api';

export default function Rewiews() {
  const { movieId } = useParams();
  const [rewiewsList, setRewiewsList] = useState([]);

  useEffect(() => {
    getMovieReviews(movieId).then(setRewiewsList);
  }, [movieId]);

  console.log('rewiewsList', rewiewsList);

  return (
    <>
      <ul className="rewiewsList">
        {rewiewsList.map((rewiew, idx) => (
          <li key={rewiew.idx} className="rewiew">
            <span className="author">{rewiew.author}</span>
            <span>{rewiew.content}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
