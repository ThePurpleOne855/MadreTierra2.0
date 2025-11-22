// API route to handle contact form submissions
// This function will be available at /api/contact

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const { name, email, message, subject } = req.body

    // Validate required fields
    if (!name || !email || !message) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, and message are required',
      })
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        error: 'Invalid email address',
      })
      return
    }

    // Here you can add logic to:
    // 1. Send email via a service (SendGrid, Resend, etc.)
    // 2. Save to a database
    // 3. Forward to another service
    // 4. Log the submission

    // Example: Log the submission (in production, you'd want to save this properly)
    console.log('Contact form submission:', {
      name,
      email,
      subject: subject || 'No subject',
      message,
      timestamp: new Date().toISOString(),
    })

    // For now, just return success
    // TODO: Integrate with email service or database
    res.status(200).json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
    })

  } catch (error) {
    console.error('Error processing contact form:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to process contact form submission',
    })
  }
}

