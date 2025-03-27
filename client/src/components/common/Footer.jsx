import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";


function Footer() {
  return (
    <footer className="kk text-light py-4 mt-5">
      <div className="container">
        <div className="row">
          {/* Brand & Description */}
          <div className="col-md-4">
            <h5>YourBrand</h5>
            <p>Empowering users with technology. Stay connected for updates.</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h5 >Quick Links</h5>
            <ul className="list-unstyled">
              
              <li>
                <a href="/contact" className="text-light text-decoration-none">Contact:</a>
              </li>
              <li>
                <a href="/privacy" className="text-light text-decoration-none">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4">
            <h4>Follow Us</h4>
            <div className="d-flex gap-3">
              <a href="https://facebook.com" className="text-light fs-5">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://twitter.com" className="text-light fs-5">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="https://instagram.com" className="text-light fs-5">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://linkedin.com" className="text-light fs-5">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-3">
          <p className="mb-0">© {new Date().getFullYear()} YourBrand. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
