import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';

const Root = () => {
  return (
    <div className="container">
      <Navigation />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
