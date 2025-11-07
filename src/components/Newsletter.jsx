import { useState } from 'react'

const Newsletter = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      alert('Thank you for subscribing! We\'ll keep you updated on our latest cigars and news.')
      setEmail('')
    }
  }

  return (
    <section id="newsletter" className="py-24 bg-gradient-to-br from-primary to-dark">
      <div className="max-w-3xl mx-auto px-5 text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-light mb-4">
          The Latest
        </h2>
        <p className="text-xl text-secondary mb-10">
          Sign up to receive updates on new cigars, our latest accolades and more!
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="flex-1 px-6 py-4 bg-light/10 border-2 border-secondary/30 text-light placeholder-light/60 rounded-sm focus:outline-none focus:border-secondary focus:bg-light/15 transition-all duration-300"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-secondary text-dark font-bold tracking-wider uppercase text-sm rounded-sm transition-all duration-300 hover:bg-tertiary hover:text-light hover:-translate-y-0.5"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}

export default Newsletter

