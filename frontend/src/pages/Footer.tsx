const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <h5>Important Links</h5>
              <ul className="list-unstyled footer-links">
                <li>
                  <a href="index.html">Home</a>
                </li>
                <li>
                  <a href="terms.html">Terms and Conditions</a>
                </li>
                <li>
                  <a href="privacy.html">Privacy Policy</a>
                </li>
                <li>
                  <a href="contact.html">Contact</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <h5>Contact Info</h5>
              <p>
                <i className="fas fa-map-marker-alt me-2"></i>123 Medical
                Street, TR
              </p>
              <p>
                <i className="fas fa-phone me-2"></i>+1 (555) 123-4567
              </p>
              <p>
                <i className="fas fa-envelope me-2"></i>info@healthpro.com
              </p>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <h5>Newsletter</h5>
              <p>Subscribe to get latest health tips and updates.</p>
              <form>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your email"
                  />
                  <button className="btn btn-primary" type="submit">
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </form>
              <div className="social-links">
                <a href="#" className="me-3">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="me-3">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="me-3">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="copyright">
        <div className="container">
          <p className="mb-0">
            Copyright &copy; 2025, healthpro. All Rights Reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
