import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMovieActors } from '../../services/fetchMovies-api';
import makeImagePath from '../../services/makeImagePath';

export default function Cast() {
  const { movieId } = useParams();
  const [actorList, setActorList] = useState([]);

  useEffect(() => {
    getMovieActors(movieId).then(actors => {
      if (actors.length === 0) {
        toast.info('There are no information about actors');
        return;
      }
      setActorList(actors);
    });
  }, [movieId]);

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
            <h5>{actor.name}</h5>
            <span>({actor.character})</span>
          </li>
        ))}
      </ul>
    </>
  );
}
