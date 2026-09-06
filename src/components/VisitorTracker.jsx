import { useEffect, useRef } from 'react'

// Component to track website visits and notify the owner
// This sends an email notification to the owner (not the visitor) when someone visits
const VisitorTracker = ({ currentPath }) => {
  const hasTrackedVisit = useRef(false)
  const cooldownKey = 'visit_tracked_cooldown'
  const cooldownSeconds = 30 // Cooldown period in seconds to prevent spam

  useEffect(() => {
    // Check if we've already tracked this visit (prevent duplicate calls)
    if (hasTrackedVisit.current) {
      return
    }

    // Check cooldown to prevent spam (track every visit but with cooldown)
    const lastVisit = sessionStorage.getItem(cooldownKey)
    if (lastVisit) {
      const lastVisitTime = parseInt(lastVisit, 10)
      const now = Date.now()
      const secondsSinceLastVisit = (now - lastVisitTime) / 1000
      
      // If within cooldown period, skip tracking
      if (secondsSinceLastVisit < cooldownSeconds) {
        console.log(`Visit tracking skipped (cooldown): ${Math.round(cooldownSeconds - secondsSinceLastVisit)} seconds remaining`)
        return
      }
    }

    // Mark that we're tracking this visit
    hasTrackedVisit.current = true
    sessionStorage.setItem(cooldownKey, Date.now().toString())

    // Wait a moment to ensure page is fully loaded
    const trackVisit = async () => {
      try {
        // Collect visitor information
        const visitorData = {
          page: currentPath || '/',
          referrer: document.referrer || 'Direct',
          userAgent: navigator.userAgent || 'Unknown',
          timestamp: new Date().toISOString(),
          screenWidth: window.screen?.width || 'Unknown',
          screenHeight: window.screen?.height || 'Unknown',
          language: navigator.language || 'Unknown',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown',
        }

        console.log('📊 Tracking visit:', visitorData.page)

        // Send notification to owner via API
        // This will send an email to the owner, NOT to the visitor
        const response = await fetch('/api/visit-notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(visitorData),
        })

        const data = await response.json()

        if (!response.ok) {
          console.error('❌ Visit notification failed:', {
            status: response.status,
            statusText: response.statusText,
            error: data.error || data.message,
          })
          
          // Reset tracking flag if there was an error so it can retry
          if (response.status >= 500) {
            hasTrackedVisit.current = false
          }
        } else {
          console.log('✅ Visit tracked successfully:', data.message || data)
          
          if (data.note) {
            console.warn('⚠️', data.note)
          }
        }
      } catch (error) {
        // Log error but don't interrupt user experience
        console.error('❌ Error tracking visit:', error.message || error)
        
        // Reset tracking flag on error so it can retry on next visit
        hasTrackedVisit.current = false
      }
    }

    // Delay tracking slightly to ensure page is loaded and age gate is processed
    const timeoutId = setTimeout(trackVisit, 3000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [currentPath])

  // This component doesn't render anything
  return null
}

export default VisitorTracker

