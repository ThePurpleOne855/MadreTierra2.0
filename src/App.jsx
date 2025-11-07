import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AgeGate from './components/AgeGate'
import HomePage from './pages/HomePage'
import SelectionPage from './pages/SelectionPage'
import LocationsPage from './pages/LocationsPage'

function App() {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute('href')
      if (href && href.startsWith('#')) {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          const offsetTop = target.offsetTop - 80
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          })
        }
      }
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick)
    })

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick)
      })
    }
  }, [])

  return (
    <BrowserRouter>
      <AgeGate />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/selection" element={<SelectionPage />} />
        <Route path="/locations" element={<LocationsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

