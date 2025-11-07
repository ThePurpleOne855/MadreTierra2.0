const logoImage = new URL('../logo/madre-tierra-cigarslogo.avif', import.meta.url).href

const Footer = () => {
  const footerSections = [
    {
      title: 'Explore',
      links: [
        { href: '/selection', label: 'Cigar Selection' },
        { href: '#about', label: 'About Us' },
        { href: '#where-to-buy', label: 'Where To Buy' },
        { href: '/locations', label: 'Locations' },
        { href: '#experience', label: 'Experience' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { href: '#contact', label: 'Contact Us' },
        { href: '#newsletter', label: 'Newsletter' },
        { href: '#experience', label: 'Events' },
        { href: '#about', label: 'Press' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { href: '#about', label: 'Terms of Use' },
        { href: '#about', label: 'Privacy Policy' },
        { href: '#about', label: 'Age Verification' },
      ],
    },
  ]

  return (
    <footer className="bg-dark py-16 text-light">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <img 
              src={logoImage} 
              alt="MadreTierra Cigars" 
              className="h-12 w-auto mb-4 object-contain"
              onError={(e) => {
                // Fallback to text if image fails to load
                e.target.style.display = 'none'
                e.target.nextElementSibling.style.display = 'block'
              }}
            />
            <div style={{ display: 'none' }}>
              <h3 className="text-2xl font-serif font-bold text-secondary mb-2">
                MadreTierra
              </h3>
              <span className="text-sm text-light tracking-wider">Cigars</span>
            </div>
            <p className="text-light/70 mt-4 leading-relaxed">
              Handcrafted excellence in every cigar.
            </p>
          </div>
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-serif font-bold text-secondary mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-light/70 hover:text-secondary transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-secondary/20 pt-8 text-center">
          <p className="text-light/60 mb-4 text-sm">
            &copy; 2025 MadreTierra Cigars. All rights reserved.
          </p>
          <p className="text-light/50 text-xs italic">
            SURGEON GENERAL'S WARNING: Cigar Smoking Can Cause Cancers Of The Mouth And Throat, Even If You Do Not Inhale.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

