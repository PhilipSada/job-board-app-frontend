
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import ScrollToTop from "./components/ScrollToTop"

function App() {


  return (
    <div>
    <ScrollToTop/>
    <Navbar/>
    <Outlet/>
    </div>
  )
}

export default App
