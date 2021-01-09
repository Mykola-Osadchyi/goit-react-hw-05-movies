import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieActors } from '../../services/fetchMovies-api';
import makeImagePath from '../../services/makeImagePath';

export default function Cast() {
  const { movieId } = useParams();
  const [actorList, setActorList] = useState([]);

  useEffect(() => {
    getMovieActors(movieId).then(setActorList);
  }, [movieId]);

  console.log('actorList', actorList);

  return (
    <>
      <ul className="actorList">
        {actorList.map(actor => (
          <li key={actor.id} className="actor">
            <img
              src={makeImagePath(actor.profile_path, 'w185')}
              alt={actor.name}
              width="52"
            />
            <span>{actor.name}</span>
            <span>Character:{actor.character}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
