import "./Footer.css";
import logo from "../assets/logo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-brand">
          <img src={logo} alt="Brand Logo" className="footer-logo" />

          <p>
            Premium car rental service with a wide selection of luxury and
            everyday vehicles for all your driving needs.
          </p>

          <div className="footer-socials">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <FaEnvelope />
          </div>
        </div>

        {/* LINKS */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/">Browse Cars</a>
          <a href="/">List Your Car</a>
          <a href="/">About Us</a>
        </div>

        {/* RESOURCES */}
        <div className="footer-links">
          <h4>Resources</h4>
          <a href="/">Help Center</a>
          <a href="/">Terms of Service</a>
          <a href="/">Privacy Policy</a>
          <a href="/">Insurance</a>
        </div>

        {/* CONTACT */}
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>1234 Luxury Drive</p>
          <p>San Francisco, CA 94107</p>
          <p>+1 234 567890</p>
          <p>info@example.com</p>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <span>© 2026 Brand. All rights reserved.</span>

        <div className="footer-policy">
          <a href="/">Privacy</a>
          <span>|</span>
          <a href="/">Terms</a>
          <span>|</span>
          <a href="/">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
