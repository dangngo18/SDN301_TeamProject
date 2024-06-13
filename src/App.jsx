import { useState } from 'react'
import reactLogo from './assets/react.svg'
import "./assets/styles/stylesall.scss";
import { HeaderAfterLogin,Header,HeaderforStudio } from './components/Header'
import Footer from './components/Footer';
import AddAPost from './pages/AddAPost';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <AddAPost/>
      <Footer/>
    </>
  )
}

export default App
