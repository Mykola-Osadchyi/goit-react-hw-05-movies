import noImage from '../images/no-image.jpg';

export default function makeImagePath(path, size = 'w342') {
  if (!path) return noImage;
  return `https://image.tmdb.org/t/p/${size}/${path}`;
}
