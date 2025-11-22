// API route to send email notification to owner when someone visits the website
// This function will be available at /api/visit-notification

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
    // Get owner email from environment variable
    const ownerEmail = process.env.OWNER_EMAIL
    if (!ownerEmail) {
      console.error('OWNER_EMAIL environment variable not set')
      res.status(500).json({
        success: false,
        error: 'Owner email not configured',
      })
      return
    }

    // Get visitor information from request
    const {
      page = 'Unknown',
      referrer = 'Direct',
      userAgent = 'Unknown',
      timestamp = new Date().toISOString(),
      screenWidth = 'Unknown',
      screenHeight = 'Unknown',
      language = 'Unknown',
      timezone = 'Unknown',
    } = req.body || {}

    // Extract IP address (Vercel provides this)
    const visitorIP = req.headers['x-forwarded-for'] || 
                     req.headers['x-real-ip'] || 
                     req.connection?.remoteAddress || 
                     'Unknown'

    // Prepare email content
    const emailSubject = `🌐 New Visitor to MadreTierra Website`
    const emailBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .header {
              background-color: #014421;
              color: #D4AF37;
              padding: 20px;
              text-align: center;
            }
            .content {
              background-color: white;
              padding: 20px;
              margin-top: 20px;
            }
            .info-row {
              padding: 10px 0;
              border-bottom: 1px solid #eee;
            }
            .info-label {
              font-weight: bold;
              color: #014421;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Website Visitor</h2>
            </div>
            <div class="content">
              <p>Someone has visited your MadreTierra Cigars website!</p>
              
              <div class="info-row">
                <span class="info-label">Page Visited:</span> ${page}
              </div>
              
              <div class="info-row">
                <span class="info-label">Visit Time:</span> ${new Date(timestamp).toLocaleString()}
              </div>
              
              <div class="info-row">
                <span class="info-label">Referrer:</span> ${referrer}
              </div>
              
              <div class="info-row">
                <span class="info-label">IP Address:</span> ${visitorIP}
              </div>
              
              <div class="info-row">
                <span class="info-label">User Agent:</span> ${userAgent.substring(0, 100)}${userAgent.length > 100 ? '...' : ''}
              </div>
              
              <div class="info-row">
                <span class="info-label">Screen Size:</span> ${screenWidth} x ${screenHeight}
              </div>
              
              <div class="info-row">
                <span class="info-label">Language:</span> ${language}
              </div>
              
              <div class="info-row">
                <span class="info-label">Timezone:</span> ${timezone}
              </div>
            </div>
            <div class="footer">
              <p>This is an automated notification from your MadreTierra website.</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Use Resend API to send email (recommended for Vercel)
    // You'll need to install: npm install resend
    // And set RESEND_API_KEY in your Vercel environment variables
    
    const RESEND_API_KEY = process.env.RESEND_API_KEY

    if (RESEND_API_KEY) {
      // Using Resend (recommended)
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(RESEND_API_KEY)
        
        // Use verified domain email or onboarding@resend.dev for testing
        const emailFrom = process.env.FROM_EMAIL || 'onboarding@resend.dev'
        
        const result = await resend.emails.send({
          from: emailFrom,
          to: ownerEmail,
          subject: emailSubject,
          html: emailBody,
        })

        if (result.error) {
          console.error('Resend API error:', result.error)
          throw new Error(result.error.message || 'Failed to send email')
        }

        res.status(200).json({
          success: true,
          message: 'Visit notification sent successfully',
          emailId: result.data?.id,
        })
        return
      } catch (resendError) {
        console.error('Error using Resend:', resendError)
        throw resendError
      }
    }

    // Fallback: Use a generic email service via fetch
    // Option 1: SendGrid
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
    if (SENDGRID_API_KEY) {
      const sendGridUrl = 'https://api.sendgrid.com/v3/mail/send'
      
      await fetch(sendGridUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: ownerEmail }],
            subject: emailSubject,
          }],
          from: {
            email: process.env.FROM_EMAIL || 'noreply@madretierra.com',
            name: 'MadreTierra Website',
          },
          content: [{
            type: 'text/html',
            value: emailBody,
          }],
        }),
      })

      res.status(200).json({
        success: true,
        message: 'Visit notification sent successfully',
      })
      return
    }

    // Fallback: Log to console (for testing)
    console.log('📧 VISIT NOTIFICATION (email service not configured):', {
      to: ownerEmail,
      subject: emailSubject,
      visitorIP,
      page,
      timestamp,
    })

    res.status(200).json({
      success: true,
      message: 'Visit logged (email service not configured - check console)',
      note: 'Set RESEND_API_KEY or SENDGRID_API_KEY in environment variables to enable email notifications',
    })

  } catch (error) {
    console.error('Error sending visit notification:', error)
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to send visit notification',
    })
  }
}

