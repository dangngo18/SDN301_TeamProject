import { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'swiper/css';
import "./assets/styles/stylesall.scss";
import { publicRoutes } from './routes/Route';
import { Route, Routes, useNavigate } from 'react-router-dom';
import NotFound from './pages/NotFound';

function App() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  // const PrivateRouteWrapper = ({ element: Component, ...rest }) => {
  //   const token = localStorage.getItem('token');
  //   return token ? Component : navigate('/login');
  // };

  return (
    <>
      <Routes>
        {publicRoutes.map((route, index) => {
          return <Route key={'route' + index} path={route.path} element={route.component} />;
        })}
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </>
  );
}

export default App
