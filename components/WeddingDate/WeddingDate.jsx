import { useEffect, useRef, useState } from "react";
import "./WeddingDate.css";

const WeddingDate = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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
        threshold: 0.25,
      }
    );

    if (section) {
      observer.observe(section);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const targetDate = new Date("2026-12-01T00:00:00");

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        return;
      }

      const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      );

      const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
      );

      const seconds = Math.floor(
        (difference / 1000) % 60
      );

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const weeks = [
    ["29", "30", "1", "2", "3", "4", "5"],
    ["6", "7", "8", "9", "10", "11", "12"],
    ["13", "14", "15", "16", "17", "18", "19"],
    ["20", "21", "22", "23", "24", "25", "26"],
    ["27", "28", "29", "30", "31", "", ""],
  ];

  return (
    <section
      ref={sectionRef}
      className={`wedding-date ${
        isVisible ? "visible" : ""
      }`}
    >
      <div className="wedding-date-content">

        <p className="save-the-date">
            Save the Date
        </p>

        {/* =========================================
            CALENDAR
        ========================================= */}

        <div className="calendar">

          <div className="calendar-header">
            <p className="calendar-month">
              December
            </p>

            <span className="calendar-year">
              2026
            </span>
          </div>


          <div className="calendar-weekdays">
            <span>S</span>
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
          </div>


          <div className="calendar-days">
            {weeks.flatMap((week, weekIndex) =>
              week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`calendar-day ${
                    day === "1"
                      ? "wedding-day"
                      : ""
                  }`}
                >
                  {day && (
                    <>
                      {day === "1" && (
                        <svg
                          className="heart-mark"
                          viewBox="0 0 90 80"
                          aria-hidden="true"
                        >
                          <path
                            d="
                              M45 72
                              C38 64 10 46 10 24
                              C10 10 26 4 37 14
                              L45 22
                              L53 14
                              C64 4 80 10 80 24
                              C80 46 52 64 45 72
                              Z
                            "
                          />
                        </svg>
                      )}

                      <span>{day}</span>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>


        {/* =========================================
            DATE TEXT
        ========================================= */}

        <div className="date-caption">
          <span>01</span>
          <span>December</span>
          <span>2026</span>
        </div>


        {/* =========================================
            DIVIDER
        ========================================= */}

        <div className="date-divider">
          <span></span>
          <span className="date-divider-symbol">
            ✦
          </span>
          <span></span>
        </div>


        {/* =========================================
            COUNTDOWN
        ========================================= */}

        <div className="countdown">
          <div className="countdown-item">
            <span className="countdown-number">
              {String(timeLeft.days).padStart(2, "0")}
            </span>

            <span className="countdown-label">
              Days
            </span>
          </div>


          <div className="countdown-item">
            <span className="countdown-number">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>

            <span className="countdown-label">
              Hours
            </span>
          </div>


          <div className="countdown-item">
            <span className="countdown-number">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>

            <span className="countdown-label">
              Minutes
            </span>
          </div>


          <div className="countdown-item">
            <span className="countdown-number">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>

            <span className="countdown-label">
              Seconds
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingDate;