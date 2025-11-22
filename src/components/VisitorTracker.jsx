import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// Component to track website visits and notify the owner
// This sends an email notification to the owner (not the visitor) when someone visits
const VisitorTracker = () => {
  const location = useLocation()
  const hasTrackedVisit = useRef(false)
  const sessionKey = 'visit_tracked_session'

  useEffect(() => {
    // Only track once per session to avoid multiple notifications
    const sessionTracked = sessionStorage.getItem(sessionKey)
    
    // Check if we've already tracked this session
    if (hasTrackedVisit.current || sessionTracked) {
      return
    }

    // Mark that we're tracking this visit
    hasTrackedVisit.current = true
    sessionStorage.setItem(sessionKey, 'true')

    // Wait a moment to ensure page is fully loaded
    const trackVisit = async () => {
      try {
        // Collect visitor information
        const visitorData = {
          page: location.pathname || '/',
          referrer: document.referrer || 'Direct',
          userAgent: navigator.userAgent || 'Unknown',
          timestamp: new Date().toISOString(),
          screenWidth: window.screen?.width || 'Unknown',
          screenHeight: window.screen?.height || 'Unknown',
          language: navigator.language || 'Unknown',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown',
        }

        // Send notification to owner via API
        // This will send an email to the owner, NOT to the visitor
        const response = await fetch('/api/visit-notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(visitorData),
        })

        if (!response.ok) {
          console.warn('Visit notification failed:', response.status)
        } else {
          const data = await response.json()
          console.log('Visit tracked successfully:', data)
        }
      } catch (error) {
        // Silently fail - don't interrupt user experience
        console.warn('Error tracking visit:', error)
      }
    }

    // Delay tracking slightly to ensure page is loaded
    const timeoutId = setTimeout(trackVisit, 2000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [location.pathname])

  // This component doesn't render anything
  return null
}

export default VisitorTracker

