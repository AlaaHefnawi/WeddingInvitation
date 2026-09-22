
import { useState } from "react";
import "./InvitationIntro.css";

const InvitationIntro = ({ onFinish }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;

    setIsOpen(true);

    // Navbar appears after the envelope animation
    setTimeout(() => {
      onFinish();
    }, 1900);
  };

  return (
    <section className={`invitation-intro ${isOpen ? "open" : ""}`}>
      <div className="envelope" onClick={handleOpen}>
        <svg
  className="envelope-svg"
  viewBox="0 0 1200 800"
  preserveAspectRatio="xMidYMid slice"
>
  {/* =========================================
     ENVELOPE BASE
  ========================================= */}

  <rect
    className="envelope-shape"
    x="-400"
    y="0"
    width="2000"
    height="800"
  />

  {/* =========================================
     LEFT FLAP
  ========================================= */}

  <path
    className="envelope-flap left-flap"
    d="M-400 0 L600 400 L-400 800 Z"
  />

  {/* =========================================
     RIGHT FLAP
  ========================================= */}

  <path
    className="envelope-flap right-flap"
    d="M1600 0 L600 400 L1600 800 Z"
  />

  {/* =========================================
     BOTTOM FLAP
  ========================================= */}

  <path
    className="envelope-flap bottom-flap"
    d="M-400 800 L600 400 L1600 800 Z"
  />

  {/* =========================================
     TOP FLAP
  ========================================= */}

  <path
    className="envelope-flap top-flap"
    d="M-400 0 L1600 0 L600 400 Z"
  />
</svg>

        {/* Paper texture */}
        <div className="paper-texture"></div>

        {/* =========================================
           SEAL
        ========================================= */}

        <div className="envelope-seal">
          <img
            src="/images/seal.webp"
            alt="Wedding seal"
          />
        </div>

        {/* =========================================
           INSTRUCTION
        ========================================= */}

        <div className="open-instruction">
          Click to open
        </div>
      </div>
    </section>
  );
};

export default InvitationIntro;