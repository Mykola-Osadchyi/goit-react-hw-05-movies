import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ShowMore from 'react-simple-show-more';
import { getMovieReviews } from '../../services/fetchMovies-api';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviewsList, setReviewsList] = useState([]);

  useEffect(() => {
    getMovieReviews(movieId).then(reviews => {
      if (reviews.length === 0) {
        toast.info('There are no reviews for this movie');
        return;
      }
      setReviewsList(reviews);
    });
  }, [movieId]);

  return (
    <>
      <ul className="reviewsList">
        {reviewsList.map(review => (
          <li key={review.id} className="review">
            <h4 className="author">{review.author}</h4>
            <p>
              "
              <ShowMore
                text={review.content}
                length={200}
                showMoreLabel=" Show more >>"
                showLessLabel=" Show less <<"
                style={{
                  cursor: 'pointer',
                  color: 'green',
                  fontWeight: 'bold',
                }}
              />
              "
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
