import { useState } from 'react'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' or 'error'
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear status when user starts typing
    if (submitStatus) {
      setSubmitStatus(null)
      setErrorMessage('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Get EmailJS credentials from environment variables
      const publicKey = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY
      const serviceId = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID
      const visitorTemplateId = import.meta.env.PUBLIC_EMAILJS_VISITOR_TEMPLATE_ID // Optional: for visitor confirmation

      // Validate environment variables with detailed error messages
      if (!publicKey) {
        console.error('Missing PUBLIC_EMAILJS_PUBLIC_KEY')
        throw new Error('EmailJS Public Key is missing. Please configure PUBLIC_EMAILJS_PUBLIC_KEY in your environment variables.')
      }
      if (!serviceId) {
        console.error('Missing PUBLIC_EMAILJS_SERVICE_ID')
        throw new Error('EmailJS Service ID is missing. Please configure PUBLIC_EMAILJS_SERVICE_ID in your environment variables.')
      }
      if (!templateId) {
        console.error('Missing PUBLIC_EMAILJS_TEMPLATE_ID')
        throw new Error('EmailJS Template ID is missing. Please configure PUBLIC_EMAILJS_TEMPLATE_ID in your environment variables.')
      }

      // Initialize EmailJS with public key
      emailjs.init(publicKey)

      // Send notification email to you (owner)
      const ownerResult = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }
      )

      // Send confirmation email to visitor (optional - only if template ID is provided)
      if (visitorTemplateId) {
        try {
          await emailjs.send(
            serviceId,
            visitorTemplateId,
            {
              visitor_name: formData.name,
              visitor_email: formData.email,
              visitor_subject: formData.subject,
              visitor_message: formData.message,
            }
          )
        } catch (visitorError) {
          // Log but don't fail if visitor email fails
          console.warn('Visitor confirmation email failed:', visitorError)
        }
      }

      // Check for successful response
      if (ownerResult && (ownerResult.status === 200 || ownerResult.text === 'OK')) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        console.error('EmailJS returned non-success status:', ownerResult)
        setErrorMessage('Something went wrong. Please try again later.')
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('EmailJS Error Details:', {
        message: error.message,
        text: error.text,
        status: error.status,
        stack: error.stack
      })

      // Provide more specific error messages
      let message = 'Something went wrong. Please try again later.'
      if (error.message) {
        message = error.message
      } else if (error.text) {
        message = error.text
      }

      setErrorMessage(message)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-light">
      <div className="max-w-4xl mx-auto px-5">
        <div className="text-center mb-12">
          <span className="leaf-rule mx-auto mb-5" />
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Contact us
          </h2>
          <p className="text-xl text-dark/70 leading-relaxed">
            Have a question or want to learn more about MadreTierra Cigars? We'd love to hear from you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-primary mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-primary/20 rounded-xl focus:outline-none focus:border-secondary transition-colors duration-300 text-dark bg-light"
                placeholder="Your name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-primary/20 rounded-xl focus:outline-none focus:border-secondary transition-colors duration-300 text-dark bg-light"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-primary mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-primary/20 rounded-xl focus:outline-none focus:border-secondary transition-colors duration-300 text-dark bg-light"
                placeholder="What is this regarding?"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-primary mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-primary/20 rounded-xl focus:outline-none focus:border-secondary transition-colors duration-300 text-dark bg-light resize-none"
                placeholder="Your message..."
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-solid w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-700 text-center">
                <p className="font-semibold">Thank you! Your message has been sent successfully.</p>
                <p className="text-sm mt-1">We'll get back to you as soon as possible.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-700 text-center">
                <p className="font-semibold">Oops! Something went wrong.</p>
                <p className="text-sm mt-1">{errorMessage || 'Please try again later or contact us directly.'}</p>
              </div>
            )}
          </div>
        </form>

        {/* Contact Numbers Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-6 text-center">
            Contact numbers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-lg font-semibold text-primary mb-2">Juana</p>
              <a 
                href="tel:321-437-1088" 
                className="text-secondary hover:text-tertiary transition-colors duration-300 text-xl font-bold"
              >
                321-437-1088
              </a>
              <p className="text-sm text-dark/70 mt-2">Español & English</p>
              <a 
                href="https://www.instagram.com/dominicanmadretierracigars?igsh=dmMxcjl3a3NnemQ4" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mt-3 hover:scale-110 transition-transform duration-300"
                aria-label="Juana's Instagram"
              >
                <svg className="w-6 h-6 text-primary hover:text-secondary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-primary mb-2">John</p>
              <a 
                href="tel:321-252-1873" 
                className="text-secondary hover:text-tertiary transition-colors duration-300 text-xl font-bold block mb-3"
              >
                321-252-1873
              </a>
              <a 
                href="https://www.instagram.com/jsd6419_madre_tierra_cigars?igsh=MXJ3NHEydXJkZ2J2aA%3D%3D&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block hover:scale-110 transition-transform duration-300"
                aria-label="John's Instagram"
              >
                <svg className="w-6 h-6 text-primary hover:text-secondary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-primary mb-2">Jake</p>
              <a 
                href="tel:321-289-2286" 
                className="text-secondary hover:text-tertiary transition-colors duration-300 text-xl font-bold"
              >
                321-289-2286
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

