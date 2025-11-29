import "../styles/footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ft-footer">
      <div className="ft-footer-inner">
        {/* Brand */}
        <div className="ft-col ft-brand">
          <h2 className="ft-logo">FootSter.</h2>
          <p className="ft-tagline">
            Step into style. Premium footwear for everyday champions.
          </p>
        </div>

        {/* Links */}
        <div className="ft-col">
          <h4>Shop</h4>
          <ul>
            <li><a href="/products">All Products</a></li>
            <li><a href="/products?category=casuals">Casuals</a></li>
            <li><a href="/products?category=sports">Sports</a></li>
            <li><a href="/products?category=heavyduty">Heavy-duty</a></li>
          </ul>
        </div>

        <div className="ft-col">
          <h4>Help</h4>
          <ul>
            <li><a href="/help">Support</a></li>
            <li><a href="/returns">Returns & Refunds</a></li>
            <li><a href="/shipping">Shipping</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div className="ft-col">
          <h4>Contact</h4>
          <ul>
            <li>support@footster.com</li>
            <li>+91-98765-43210</li>
          </ul>
          <div className="ft-social">
            <span>Follow us</span>
            <div className="ft-social-icons">
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="Twitter">X</a>
              <a href="#" aria-label="Facebook">Fb</a>
            </div>
          </div>
        </div>
      </div>

      <div className="ft-bottom">
        <p>© {year} FootSter. All rights reserved.</p>
        <div className="ft-bottom-links">
          <a href="/privacy">Privacy Policy</a>
          <span>•</span>
          <a href="/terms">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}
