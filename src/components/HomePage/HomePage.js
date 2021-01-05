import { fetchMoviesGetTrending } from '../../services/fetchMovies-api';
// function HomePage() {
//   return <div className="HomePage">HomePage</div>;
// }

fetchMoviesGetTrending().then(results => console.log('results123', results));
// const { results } = await fetchMoviesGetTrending();

const HomePage = () => {
  console.log('qwe');
  return <div className="HomePage">HomePage</div>;
};
// <ul className="HomePage">
//   {data.map(({ id, title }) => (
//     <li key={id} className="HomePage">
//       <p>{title}</p>
//     </li>
//   ))}
// </ul>

export default HomePage;
