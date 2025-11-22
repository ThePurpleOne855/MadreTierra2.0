import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const GoogleCalendarEmbed = () => {
  const calendarUrl = "https://calendar.google.com/calendar/embed?src=29877f1dc29c09269456640eb2198ab85a5234e11cfb75022bf511fa676e9691%40group.calendar.google.com&ctz=America%2FNew_York"

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Calendar Container with Styled Border */}
      <div className="bg-dark/50 rounded-lg p-6 border border-secondary/20 overflow-hidden">
        <div className="rounded-lg overflow-hidden shadow-2xl relative bg-white">
          <iframe
            src={calendarUrl}
            style={{
              border: 0,
              width: '100%',
              height: '600px',
              display: 'block'
            }}
            frameBorder="0"
            scrolling="no"
            title="MadreTierra Private Events Calendar"
            className="w-full"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}

const PrivateEventsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <section className="py-24 bg-dark min-h-screen">
        <div className="max-w-7xl mx-auto px-5">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-light mb-4">
              Private Events
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
              Experience MadreTierra at exclusive private events and tastings. View our calendar below to see upcoming events, or contact us to host your own private event.
            </p>
          </div>

          {/* Google Calendar Embed */}
          <GoogleCalendarEmbed />

          {/* Additional Info Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-light/5 p-10 border border-secondary/20 rounded-lg transition-all duration-300 hover:bg-light/10 hover:border-secondary">
              <h3 className="text-2xl font-serif font-bold text-secondary mb-4">
                Private Tastings
              </h3>
              <p className="text-light mb-6 leading-relaxed">
                Host an exclusive private tasting event featuring our premium selection of MadreTierra cigars. Perfect for corporate gatherings, celebrations, or intimate gatherings.
              </p>
            </div>

            <div className="bg-light/5 p-10 border border-secondary/20 rounded-lg transition-all duration-300 hover:bg-light/10 hover:border-secondary">
              <h3 className="text-2xl font-serif font-bold text-secondary mb-4">
                Event Booking
              </h3>
              <p className="text-light mb-6 leading-relaxed">
                View our calendar above to see scheduled private events. If you'd like to host your own event, contact us to discuss your event needs and we'll work with you to create an unforgettable experience.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-br from-primary to-dark rounded-lg p-12 text-light border border-secondary/20">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Ready to Plan Your Event?
              </h2>
              <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto">
                Contact us today to discuss your private event needs and discover how we can make your gathering exceptional.
              </p>
              <a
                href="/#contact"
                className="inline-block px-10 py-4 bg-secondary text-dark font-bold tracking-wider uppercase text-sm rounded-sm transition-all duration-300 hover:bg-tertiary hover:text-light hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/30"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default PrivateEventsPage

