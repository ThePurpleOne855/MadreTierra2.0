// Vercel Serverless Function Example
// This function will be available at /api/hello

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // Handle GET requests
  if (req.method === 'GET') {
    res.status(200).json({
      message: 'Hello from Vercel API!',
      timestamp: new Date().toISOString(),
    })
    return
  }

  // Handle POST requests
  if (req.method === 'POST') {
    const { body } = req
    res.status(200).json({
      message: 'Data received',
      receivedData: body,
      timestamp: new Date().toISOString(),
    })
    return
  }

  // Method not allowed
  res.status(405).json({ error: 'Method not allowed' })
}

