
// import { useState } from "react";
// import "./InvitationIntro.css";

// const InvitationIntro = ({ onFinish }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleOpen = () => {
//     if (isOpen) return;

//     setIsOpen(true);

//     // Navbar appears after the envelope animation
//     setTimeout(() => {
//       onFinish();
//     }, 1900);
//   };

//   return (
//     <section className={`invitation-intro ${isOpen ? "open" : ""}`}>
//       <div className="envelope" onClick={handleOpen}>
//         <svg
//   className="envelope-svg"
//   viewBox="0 0 1200 800"
//   preserveAspectRatio="none"
// >
//   {/* =========================================
//      ENVELOPE BASE
//   ========================================= */}

//   <rect
//     className="envelope-shape"
//     x="-400"
//     y="0"
//     width="2000"
//     height="800"
//   />

//   {/* =========================================
//      LEFT FLAP
//   ========================================= */}

//   <path
//     className="envelope-flap left-flap"
//     d="M-400 0 L600 400 L-400 800 Z"
//   />

//   {/* =========================================
//      RIGHT FLAP
//   ========================================= */}

//   <path
//     className="envelope-flap right-flap"
//     d="M1600 0 L600 400 L1600 800 Z"
//   />

//   {/* =========================================
//      BOTTOM FLAP
//   ========================================= */}

//   <path
//     className="envelope-flap bottom-flap"
//     d="M-400 800 L600 400 L1600 800 Z"
//   />

//   {/* =========================================
//      TOP FLAP
//   ========================================= */}

//   <path
//     className="envelope-flap top-flap"
//     d="M-400 0 L1600 0 L600 400 Z"
//   />
// </svg>

//         {/* Paper texture */}
//         <div className="paper-texture"></div>

//         {/* =========================================
//            SEAL
//         ========================================= */}

//         <div className="envelope-seal">
//           <img
//             src="/images/seal.webp"
//             alt="Wedding seal"
//           />
//         </div>

//         {/* =========================================
//            INSTRUCTION
//         ========================================= */}

//         <div className="open-instruction">
//           Click to open
//         </div>
//       </div>
//     </section>
//   );
// };

// export default InvitationIntro;





import { useState } from "react";
import "./InvitationIntro.css";

const isSafari =
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const InvitationIntro = ({ onFinish }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;

    setIsOpen(true);

    setTimeout(() => {
      onFinish();
    }, 1900);
  };

  return (
    <section className={`invitation-intro ${isOpen ? "open" : ""}`}>
      <div className="envelope" onClick={handleOpen}>

        {/* NORMAL SVG */}
        {!isSafari && (
          <svg
            className="envelope-svg"
            viewBox="0 0 1200 800"
            preserveAspectRatio="none"
          >
            <defs>
              <filter
                id="shadow"
                x="-30%"
                y="-30%"
                width="160%"
                height="160%"
              >
                <feDropShadow
                  dx="0"
                  dy="10"
                  stdDeviation="12"
                  floodColor="#59483c"
                  floodOpacity="0.25"
                />
              </filter>
            </defs>

            <rect
              className="envelope-shape"
              x="-400"
              y="0"
              width="2000"
              height="800"
            />

            <path
              className="envelope-flap left-flap"
              d="M-400 0 L600 400 L-400 800 Z"
              filter="url(#shadow)"
            />

            <path
              className="envelope-flap right-flap"
              d="M1600 0 L600 400 L1600 800 Z"
              filter="url(#shadow)"
            />

            <path
              className="envelope-flap bottom-flap"
              d="M-400 800 L600 400 L1600 800 Z"
              filter="url(#shadow)"
            />

            <path
              className="envelope-flap top-flap"
              d="M-400 0 L1600 0 L600 400 Z"
              filter="url(#shadow)"
            />
          </svg>
        )}

        {/* SAFARI SVG */}
        {isSafari && (
          <svg
            className="envelope-svg safari-envelope-svg"
            viewBox="0 0 1200 800"
            preserveAspectRatio="none"
          >
            {/* Base */}
            <rect
              className="safari-envelope-shape"
              x="0"
              y="0"
              width="1200"
              height="800"
            />

            {/* Left flap */}
            <polygon
              className="safari-envelope-flap safari-left-flap"
              points="0,0 600,400 0,800"
            />

            {/* Right flap */}
            <polygon
              className="safari-envelope-flap safari-right-flap"
              points="1200,0 600,400 1200,800"
            />

            {/* Bottom flap */}
            <polygon
              className="safari-envelope-flap safari-bottom-flap"
              points="0,800 600,400 1200,800"
            />

            {/* Top flap */}
            <polygon
              className="safari-envelope-flap safari-top-flap"
              points="0,0 1200,0 600,400"
            />
          </svg>
        )}
<div className="paper-texture"></div>
        {/* Seal */}
        <div className="envelope-seal">
          <img
            src="/images/seal.webp"
            alt="Wedding seal"
          />
        </div>

        {/* Instruction */}
        <div className="open-instruction">
          Click to open
        </div>
      </div>
    </section>
  );
};

export default InvitationIntro;