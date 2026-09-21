import { useEffect, useRef, useState } from "react";
import "./QuranVerse.css";

const QuranVerse = () => {
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
        threshold: 0.35,
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
      className={`quran-verse ${isVisible ? "visible" : ""}`}
    >
      <div className="quran-verse-content">

        <div className="bismilah">
         بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ
        </div>
        {/* <p className="quran-arabic" dir="rtl">
            بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ
        </p> */}

        <p className="quran-arabic" dir="rtl">
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ
          أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم
          مَّوَدَّةً وَرَحْمَةً
        </p>

        <div className="quran-divider">
          <span></span>
          <span className="quran-divider-symbol">✦</span>
          <span></span>
        </div>

        <p className="quran-english">
          “And among His signs is that He created for you
          spouses from among yourselves so that you may find
          tranquility in them; and He placed between you
          affection and mercy.”
        </p>

        <p className="quran-reference">
          Qur’an 30:21
        </p>

      </div>
    </section>
  );
};

export default QuranVerse;