import { PhoneCall, Mail, MapPin, Instagram, Facebook, LayoutDashboard, Heart } from "lucide-react";
import { motion } from "framer-motion";

function Footer() {
  return (
    <footer className="footer" style={{ borderTop: '1px solid rgba(224, 49, 49, 0.1)', background: 'linear-gradient(to right, #fffafa, #fff)' }}>
      <div className="footer-content">
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><PhoneCall size={16} color="#E03131" /> +91 98765 43210</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={16} color="#E03131" /> sweetcrumbs@gmail.com</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} color="#E03131" /> Coimbatore, Tamil Nadu</p>

          <motion.a
            href="https://wa.me/919876543210"
            target="_blank"
            className="btn primary btn-small"
            style={{ marginTop: '1rem', display: 'inline-flex', gap: '6px' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
             Chat on WhatsApp
          </motion.a>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="quick-links">
            <li><a href="/">Home</a></li>
            <li><a href="/products">Menu</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="/orders">My Orders</a></li>
            <li>
              <a href="/admin" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#E03131', fontWeight: 500 }}>
                 <LayoutDashboard size={14} /> Admin Panel
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons" style={{ display: 'flex', gap: '1rem' }}>
            <motion.a
              href="https://www.instagram.com/"
              target="_blank"
              className="social"
              whileHover={{ y: -3, color: '#E1306C' }}
              style={{ color: '#4B5563' }}
            >
              <Instagram size={28} />
            </motion.a>
            <motion.a 
              href="https://facebook.com" 
              target="_blank" 
              className="social"
              whileHover={{ y: -3, color: '#4267B2' }}
              style={{ color: '#4B5563' }}
            >
              <Facebook size={28} />
            </motion.a>
          </div>
        </div>

        <div className="footer-section map-section">
          <h4>Locate Us</h4>
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.366185697309!2d80.22097867486854!3d13.083761112006717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265bb0f1abc45%3A0x84b3f92e68e45d4!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000"
            width="260"
            height="140"
            style={{ border: 'none', borderRadius: "16px", boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <p className="footer-bottom" style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.05)', color: '#6B7280', fontSize: '0.9rem' }}>
        © {new Date().getFullYear()} Saswin Bakery · Crafted with <Heart size={14} fill="#E03131" color="#E03131" style={{ display: 'inline', verticalAlign: 'middle' }} /> by Selva
      </p>
    </footer>
  );
}

export default Footer;
