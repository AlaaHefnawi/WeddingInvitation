import { useEffect, useRef, useState } from "react";
import "./GuestArrangements.css";

const GuestArrangements = () => {
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

  return (
    <section
      ref={sectionRef}
      id="notes"
      className={`guest-arrangements ${
        isVisible ? "visible" : ""
      }`}
    >
      <div className="guest-arrangements-content">

        {/* =========================================
           HEADER
        ========================================= */}

        <p className="arrangements-eyebrow">
          Important Information
        </p>

        <h2 className="arrangements-title">
          Guest Arrangements & Privacy
        </h2>

        <div className="arrangements-divider">
          <span></span>
          <span>✦</span>
          <span></span>
        </div>


        {/* =========================================
           ENGLISH
        ========================================= */}

        <div className="language-block english-block">
          {/* <p className="language-label">
            English
          </p> */}

          <p className="arrangements-intro">
            To ensure the comfort and privacy of all our
            guests, the celebration will be held in
            separate halls:
          </p>

          <div className="arrangement-list">

            <div className="arrangement-item">
              <h3>
                {/* <span className="item-number">01</span> */}
                Gentlemen
              </h3>

              <p>
                First floor, accessible via the main entrance.
              </p>
            </div>

            <div className="arrangement-item">
              <h3>
                {/* <span className="item-number">02</span> */}
                Ladies
              </h3>

              <p>
                Second floor, accessible via the dedicated
                rear entrance.
              </p>
            </div>

          </div>

          <p className="privacy-note">
            For the complete privacy of our female guests,
            all cameras on the second floor will remain
            turned off, and the windows will be fully
            covered throughout the celebration.
          </p>
        </div>


        {/* =========================================
           DIVIDER
        ========================================= */}

        <div className="language-divider">
          <img
          src="/images/divider1.png"
          alt=""
     />
        </div>


        {/* =========================================
           ARABIC
        ========================================= */}

        <div
          className="language-block arabic-block"
          dir="rtl"
        >
          {/* <p className="language-label">
            العربية
          </p> */}

          <p className="arrangements-intro">
            حرصاً على راحة وخصوصية ضيوفنا الكرام، سيُقام
            الحفل في قاعات منفصلة:
          </p>

          <div className="arrangement-list">

            <div className="arrangement-item">
              <h3>
                {/* <span className="item-number">
                  01
                </span> */}
                قاعة الرجال
              </h3>

              <p>
                الطابق الأول، والدخول عبر المدخل الرئيسي.
              </p>
            </div>

            <div className="arrangement-item">
              <h3>
                {/* <span className="item-number">
                  02
                </span> */}
                قاعة النساء
              </h3>

              <p>
                الطابق الثاني، والدخول عبر المدخل الخلفي
                المخصص.
              </p>
            </div>

          </div>

          <p className="privacy-note">
            ولضمان الخصوصية التامة للسيدات، ستكون جميع
            الكاميرات في الطابق الثاني مطفأة بالكامل،
            وستُغطّى النوافذ طوال فترة الحفل.
          </p>
        </div>

      </div>
    </section>
  );
};

export default GuestArrangements;