import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMovieActors } from '../../services/fetchMovies-api';
import makeImagePath from '../../services/makeImagePath';
import s from './Cast.module.css';

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
      <ul className={s.cast}>
        {actorList.map(actor => (
          <li key={actor.id} className={s.item}>
            <img
              src={makeImagePath(actor.profile_path, 'w185')}
              alt={actor.name}
              width="82"
            />
            <h5 className={s.name}>{actor.name}</h5>
            <span className={s.character}>{actor.character}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
