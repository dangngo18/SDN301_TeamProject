import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'swiper/css';
import "./assets/styles/stylesall.scss";
import { publicRoutes, privateRoute } from './routes/Route';
import { Route, Routes, Link } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  const PrivateRouteWrapper = ({ element: Component, ...rest }) => {
    const token = localStorage.getItem('token');
    return token ? Component : <Link to="/login" />;
  };

  return (
    <>
      <Routes>
        {publicRoutes.map((route, index) => {
          return <Route key={'route' + index} path={route.path} element={route.component} />;
        })}
        {privateRoute.map((route, index) => {
          return <Route key={'route' + index} path={route.path} element={<PrivateRouteWrapper element={route.component} />} />;
        })}
      </Routes>
    </>
  );
}

export default App
