// import './App.css'
import Navbar from './components/HomeComponent/Navbar/Navbar'
import Footer from './components/HomeComponent/Footer/Footer'
import { Outlet } from "react-router-dom";

function App() {

  return (
    <>
      <Navbar/>
<Outlet/>
      <Footer/>

    </>
  )
}

export default App
