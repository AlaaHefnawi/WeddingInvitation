import { useEffect, useRef, useState } from "react";
import "./WeddingDetails.css";

const WeddingDetails = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (section) {
      observer.observe(section);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const notes = [
    {
      title: "Date & Time",
      text: "Tuesday, December 1, 2026 6:00 PM – 10:00 PM",
      image: "/images/card-dark.png",
      textColor: "white",
      align: "left",
    },
    {
      title: "Venue",
      text: "Moka & Co, 7500 5th Ave, Brooklyn, NY 11209",
      image: "/images/card-light.png",
      textColor: "red",
      align: "center",
    },
  ];

  return (
    <>
    <section
      ref={sectionRef}
      id="details"
      className={`wedding-notes ${isVisible ? "visible" : ""}`}
    >
      <div className="wedding-notes-content">

        {/* <p className="notes-subtitle">
          A little something to know
        </p> */}

        <h2 className="notes-title">
          Celebration Details
        </h2>

        <div className="notes-divider">
          <span></span>
          <span>✦</span>
          <span></span>
        </div>

        <div className="notes-cards">
          {notes.map((note, index) => (
            <div
              key={index}
              className={`note-card text-${note.textColor} align-${note.align}`}
              style={{
                backgroundImage: `url("${note.image}")`,
              }}
            >
              <div className="note-card-content">
                {/* <p className="note-card-number">
                  {String(index + 1).padStart(2, "0")}
                </p> */}

                <h3>{note.title}</h3>

                <span className="note-card-line"></span>

                <p className="note-card-text">
                  {note.text}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
    <section className="venue-map">
  <div className="map-frame">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3028.0196281633603!2d-74.0229319!3d40.629449099999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c245d8c17bd6f5%3A0x4e82e28e71f53b5!2sMoka%20%26%20Co!5e0!3m2!1sen!2suk!4v1789340353654!5m2!1sen!2suk"
      title="Moka & Co location"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</section>
    </>
    
  );
};

export default WeddingDetails;