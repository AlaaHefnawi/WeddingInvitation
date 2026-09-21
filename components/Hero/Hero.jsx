import "./Hero.css";

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <p className="hero-subtitle">THE WEDDING OF</p>

        <div className="hero-title">
          <h1>Moaz Kamel</h1> <h1>&</h1> <h1>Rafah AboShaer</h1>
        </div>

        <p className="hero-date"> DECEMBER 1, 2026</p>
      </div>

      <div className="scroll-indicator">
        <span></span>
        {/* <p>Scroll to discover</p> */}
      </div>
    </section>
  );
};

export default Hero;