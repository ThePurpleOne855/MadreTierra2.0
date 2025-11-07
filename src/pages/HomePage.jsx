import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Featured from '../components/Featured'
import About from '../components/About'
import WhereToBuy from '../components/WhereToBuy'
import Experience from '../components/Experience'
import Contact from '../components/Contact'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

const HomePage = () => {
  const location = useLocation()

  useEffect(() => {
    // Handle hash scrolling when navigating to home page with hash
    if (location.hash) {
      setTimeout(() => {
        const target = document.querySelector(location.hash)
        if (target) {
          const offsetTop = target.offsetTop - 80
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          })
        }
      }, 100)
    } else {
      // Scroll to top if no hash
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [location])

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Featured />
      <About />
      <WhereToBuy />
      <Experience />
      <Contact />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default HomePage

