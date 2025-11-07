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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear status when user starts typing
    if (submitStatus) {
      setSubmitStatus(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Get EmailJS credentials from environment variables
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID

      // Validate environment variables
      if (!publicKey || !serviceId || !templateId) {
        throw new Error('EmailJS configuration is missing. Please check your environment variables.')
      }

      // Initialize EmailJS with public key
      emailjs.init(publicKey)

      // Send email using EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }
      )

      if (result.status === 200) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('EmailJS Error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-light">
      <div className="max-w-4xl mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Contact Us
          </h2>
          <p className="text-xl text-dark/70 leading-relaxed">
            Have a question or want to learn more about MadreTierra Cigars? We'd love to hear from you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-8 md:p-12">
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
                className="w-full px-4 py-3 border-2 border-primary/20 rounded-sm focus:outline-none focus:border-secondary transition-all duration-300 text-dark bg-light"
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
                className="w-full px-4 py-3 border-2 border-primary/20 rounded-sm focus:outline-none focus:border-secondary transition-all duration-300 text-dark bg-light"
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
                className="w-full px-4 py-3 border-2 border-primary/20 rounded-sm focus:outline-none focus:border-secondary transition-all duration-300 text-dark bg-light"
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
                className="w-full px-4 py-3 border-2 border-primary/20 rounded-sm focus:outline-none focus:border-secondary transition-all duration-300 text-dark bg-light resize-none"
                placeholder="Your message..."
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-10 py-4 bg-secondary text-dark font-bold tracking-wider uppercase text-sm rounded-sm transition-all duration-300 hover:bg-tertiary hover:text-light hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-500/20 border-2 border-green-500/30 rounded-sm text-green-700 text-center">
                <p className="font-semibold">Thank you! Your message has been sent successfully.</p>
                <p className="text-sm mt-1">We'll get back to you as soon as possible.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-500/20 border-2 border-red-500/30 rounded-sm text-red-700 text-center">
                <p className="font-semibold">Oops! Something went wrong.</p>
                <p className="text-sm mt-1">Please try again later or contact us directly.</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}

export default Contact

