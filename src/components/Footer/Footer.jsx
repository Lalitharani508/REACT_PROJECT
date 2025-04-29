import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaEnvelope } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-wrapper">
      <Container>
        {/* Main Footer Content */}
        <Row className="footer-main py-5">
          <Col md={4} className="mb-4 mb-md-0">
            <div className="footer-brand">
              <h3>WishWell</h3>
              <p className="mt-3">
                Create beautiful gift registries for your special occasions.
                Share with friends and family to make your wishes come true.
              </p>
              <div className="social-icons mt-4">
                <a href="#" className="social-icon" aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href="#" className="social-icon" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="#" className="social-icon" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="#" className="social-icon" aria-label="Pinterest">
                  <FaPinterest />
                </a>
              </div>
            </div>
          </Col>
          
          <Col md={2} className="mb-4 mb-md-0">
            <h5 className="footer-title">Account</h5>
            <Nav className="flex-column footer-links">
              <Nav.Link as={Link} to="/login">Log In</Nav.Link>
              <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
              <Nav.Link as={Link} to="/dashboard">My Dashboard</Nav.Link>
              <Nav.Link as={Link} to="/create-registry">Create Registry</Nav.Link>
            </Nav>
          </Col>
          
          <Col md={2} className="mb-4 mb-md-0">
            <h5 className="footer-title">Discover</h5>
            <Nav className="flex-column footer-links">
              <Nav.Link as={Link} to="/how-it-works">How It Works</Nav.Link>
              <Nav.Link as={Link} to="/features">Features</Nav.Link>
              <Nav.Link as={Link} to="/ideas">Gift Ideas</Nav.Link>
              <Nav.Link as={Link} to="/examples">Examples</Nav.Link>
            </Nav>
          </Col>
          
          <Col md={2} className="mb-4 mb-md-0">
            <h5 className="footer-title">Company</h5>
            <Nav className="flex-column footer-links">
              <Nav.Link as={Link} to="/about">About Us</Nav.Link>
              <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
              <Nav.Link as={Link} to="/careers">Careers</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            </Nav>
          </Col>
          
          <Col md={2}>
            <h5 className="footer-title">Support</h5>
            <Nav className="flex-column footer-links">
              <Nav.Link as={Link} to="/help">Help Center</Nav.Link>
              <Nav.Link as={Link} to="/faq">FAQ</Nav.Link>
              <Nav.Link as={Link} to="/privacy">Privacy Policy</Nav.Link>
              <Nav.Link as={Link} to="/terms">Terms of Service</Nav.Link>
            </Nav>
          </Col>
        </Row>
        
       
        
        {/* Footer Bottom */}
        <Row className="footer-bottom py-3">
          <Col md={6} className="footer-copyright mb-2 mb-md-0">
            <p className="mb-0">© {currentYear} WishWell. All rights reserved.</p>
          </Col>
          <Col md={6}>
            <Nav className="justify-content-md-end justify-content-center footer-bottom-links">
              <Nav.Link as={Link} to="/privacy">Privacy</Nav.Link>
              <Nav.Link as={Link} to="/terms">Terms</Nav.Link>
              <Nav.Link as={Link} to="/cookies">Cookies</Nav.Link>
              <Nav.Link as={Link} to="/sitemap">Sitemap</Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;