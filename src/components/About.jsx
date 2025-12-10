import rollingCigarsVideo from '../VideoMain/RollingCigars.mp4'

const About = () => {
  return (
    <section id="about" className="py-24 bg-light">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-8">
              Our Story
            </h2>
            <p className="text-xl text-dark mb-6 leading-relaxed">
              Madre Tierra is a family-owned and operated brand of fine cigars, all handmade in Tamboril, Dominican Republic. Blending cigars since 1983, we have dedicated decades to perfecting our craft and creating exceptional smoking experiences.
            </p>
            <p className="text-xl text-dark mb-6 leading-relaxed">
              Our expertly blended cigars combine the finest tobaccos from Ecuador and the Dominican Republic, and we proudly manage the entire process from seed to smoke. This complete control over every step ensures the highest quality and consistency in every cigar we produce.
            </p>
            <p className="text-xl text-dark leading-relaxed">
              Recently introduced to the U.S. market by owners Juana De La Cruz, John Deans, and Jacob Senior, Madre Tierra made its first major debut during a "Cut-n-Light" event at Smoke Rings-72, a premier cigar lounge located in Merritt Island, FL. We are excited to share our passion and craftsmanship with cigar enthusiasts across America.
            </p>
          </div>
          <div className="rounded shadow-2xl overflow-hidden bg-dark">
            <video
              src={rollingCigarsVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

