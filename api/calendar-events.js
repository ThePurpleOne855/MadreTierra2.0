// API route to fetch Google Calendar events
// This function will be available at /api/calendar-events
// 
// Environment variables needed:
// - GOOGLE_CALENDAR_ID: Your Google Calendar ID
// - GOOGLE_API_KEY: Your Google API Key (optional, for public calendars)

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    // Get calendar ID from environment variable or use the one from your embed URL
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 
      '29877f1dc29c09269456640eb2198ab85a5234e11cfb75022bf511fa676e9691@group.calendar.google.com'
    
    // Get API key from environment variable (optional for public calendars)
    const apiKey = process.env.GOOGLE_API_KEY
    
    // Build the Google Calendar API URL
    const baseUrl = 'https://www.googleapis.com/calendar/v3/calendars'
    const params = new URLSearchParams({
      // Convert calendar ID to URL format
      calendarId: encodeURIComponent(calendarId),
      timeMin: new Date().toISOString(),
      maxResults: '50',
      singleEvents: 'true',
      orderBy: 'startTime',
    })

    if (apiKey) {
      params.append('key', apiKey)
    }

    // Fetch events from Google Calendar API
    // For public calendars, you can use the public feed format:
    const publicFeedUrl = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`
    
    const url = apiKey 
      ? `${publicFeedUrl}?${params.toString()}`
      : `${publicFeedUrl}?timeMin=${new Date().toISOString()}&maxResults=50&singleEvents=true&orderBy=startTime`

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Google Calendar API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    // Format the response
    res.status(200).json({
      success: true,
      events: data.items || [],
      calendarId: calendarId,
    })

  } catch (error) {
    console.error('Error fetching calendar events:', error)
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch calendar events',
    })
  }
}

