import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import AgeGate from './components/AgeGate'
import VisitorTracker from './components/VisitorTracker'
import HomePage from './pages/HomePage'
import SelectionPage from './pages/SelectionPage'
import LocationsPage from './pages/LocationsPage'
import GalleryPage from './pages/GalleryPage'
import PrivateEventsPage from './pages/PrivateEventsPage'
import EndorsementsPage from './pages/EndorsementsPage'
import NotFoundPage from './pages/NotFoundPage'

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
      <VisitorTracker />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/selection" element={<SelectionPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/private-events" element={<PrivateEventsPage />} />
        <Route path="/endorsements" element={<EndorsementsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  )
}

export default App

