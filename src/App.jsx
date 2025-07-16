import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TopBar from './assets/Components/TopBar'
import Navbar from './assets/Components/Navbar'
import HomePage from './assets/Components/HomePage'
import Homenext from './assets/Components/Homenext'
import Footer from './assets/Components/Footer'
import ContactUs from './assets/Components/Contactus'
import BookNow from './assets/Components/BookNow'
import Extras from './assets/Components/Extras'
import Ultrapremium from './assets/Components/Ultrapremium'
import Detailing from './assets/Components/Detailing'
import Washing from './assets/Components/Washing'
import About from './assets/Components/About'

function App() {
  return (
    <div >
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <TopBar />
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomePage />
                <Homenext />
              </>
            }
          />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/booking" element={<BookNow />} />
          <Route path="/extras" element={<Extras />} />
          <Route path="/ultrapremium" element={<Ultrapremium />} />
          <Route path="/detailing" element={<Detailing />} />
          <Route path="/washing" element={<Washing />} />
          <Route path="/about" element={<About />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  )
}

export default App
