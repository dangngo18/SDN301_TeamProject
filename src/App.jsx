import { useEffect, useState } from 'react'
import 'swiper/css';
// import 'swiper/swiper-bundle.min.css';
import "./assets/styles/stylesall.scss";
import { publicRoutes } from './routes/Route';
import { Route, Routes, useNavigate } from 'react-router-dom';
import NotFound from './pages/NotFound';

function App() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

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
