# Vercel API Routes

This folder contains serverless functions that run on Vercel's edge network.

## Available API Routes

### `/api/hello`
A simple example endpoint that demonstrates basic request handling.

**Methods:**
- `GET` - Returns a greeting message
- `POST` - Echoes back the received data

### `/api/calendar-events`
Fetches events from your Google Calendar.

**Methods:**
- `GET` - Returns upcoming calendar events

**Environment Variables:**
- `GOOGLE_CALENDAR_ID` - Your Google Calendar ID (optional, defaults to the one in the embed URL)
- `GOOGLE_API_KEY` - Google API Key (optional for public calendars)

### `/api/contact`
Handles contact form submissions.

**Methods:**
- `POST` - Processes contact form data

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "Your message here"
}
```

## How Vercel API Routes Work

1. **File-based Routing**: Each file in the `api/` folder becomes an API endpoint
   - `api/hello.js` → `/api/hello`
   - `api/calendar-events.js` → `/api/calendar-events`

2. **Serverless Functions**: These functions run on-demand and scale automatically

3. **CORS**: All functions include CORS headers to allow requests from your frontend

4. **Environment Variables**: Set these in your Vercel project settings:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables

## Local Development

To test API routes locally, you can use Vercel CLI:

```bash
npm install -g vercel
vercel dev
```

Or use the Vercel CLI with your existing dev server (Vite):

```bash
vercel dev --listen 5173
```

## Deployment

When you deploy to Vercel, these API routes will automatically be available at:
- `https://your-domain.vercel.app/api/hello`
- `https://your-domain.vercel.app/api/calendar-events`
- `https://your-domain.vercel.app/api/contact`

## Example Usage

### From your React frontend:

```javascript
// Fetch calendar events
const response = await fetch('/api/calendar-events')
const data = await response.json()
console.log(data.events)

// Submit contact form
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello!',
  }),
})
const result = await response.json()
```

