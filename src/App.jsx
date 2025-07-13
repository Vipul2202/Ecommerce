import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import TopBar from './assets/Components/TopBar'
import Navbar from './assets/Components/Navbar'
import HomePage from './assets/Components/HomePage'
import Homenext from './assets/Components/Homenext'
import Footer from './assets/Components/Footer'
// import ContactUs from './pages/ContactUs' 
import ContactUs from './assets/Components/Contactus'
import BookNow from './assets/Components/BookNow'
import Extras from './assets/Components/Extras'
import Ultrapremium from './assets/Components/Ultrapremium'
function App() {
  return (
    <div className=''>
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

      </Routes>

      <Footer />
    </Router>
    </div>
  )
}

export default App
