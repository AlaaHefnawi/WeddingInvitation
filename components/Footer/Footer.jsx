import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-content">

        <div className="footer-logo">
          <img
            src="/images/rings.png"
            alt="Moaz & Rafah"
          />
        </div>

        {/* <p className="footer-thank-you">
          Thank you
        </p> */}
    
        <p className="footer-message-arabic">بَارَكَ اللهُ لِمُعَاذٍ وَرَفَاه، وَبَارَكَ عَلَيْهِمَا، وَجَمَعَ بَيْنَهُمَا فِي خَيْرٍ</p>

        <p className="footer-message">
          We can’t wait to celebrate this blessed union with you, Insha'Allah
        </p>

        <div className="footer-divider"></div>
        <p className="with-love">
          with love
        </p>

        <p className="footer-names">
          Moaz & Rafah
        </p>

      </div>

    </footer>
  );
};

export default Footer;