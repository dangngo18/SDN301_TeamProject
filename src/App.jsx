import { useState } from 'react'
import "./assets/styles/stylesall.scss";
import { publicRoutes } from './routes/Route';
import { Route, Routes, Link } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        {publicRoutes.map((route, index) => {
          return <Route key={'route'+index} path={route.path} element={route.component} />
        })}
      </Routes>
    </>
  )
}

export default App
