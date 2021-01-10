import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './Loader.module.css';

const LoaderPage = () => {
  return (
    <div className={s.loader}>
      <Loader
        type="ThreeDots"
        color="blue"
        height={80}
        width={80}
        timeout={2000}
      />
    </div>
  );
};

export default LoaderPage;
