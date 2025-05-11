import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { FaRegHeart, FaCheck, FaStar } from 'react-icons/fa';
import Navbar1 from "./navbar.jsx";
import '@fortawesome/fontawesome-free/css/all.min.css';


// import  // Import your existing Navbar
import './Landing.css'; // You'll need to create this CSS file

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Using your existing Navbar component */}
      <Navbar1 />
      
      {/* Hero Section */}
      <section className="hero-section animate__animated animate__fadeIn">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="hero-content animate__animated animate__fadeIn animate__delay-1s">
              <h1>Save Your Dreams in the <span className="highlight">Wish Vault</span></h1>
              <p className="hero-subtitle">The perfect place to collect, organize, and fulfill your wishes</p>
              <div className="hero-buttons">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="get-started-btn"
                  onClick={() => navigate("/signup")}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outline-light" 
                  size="lg" 
                  className="learn-more-btn"
                  onClick={() => document.getElementById('features').scrollIntoView({behavior: 'smooth'})}
                >
                  Learn More
                </Button>
              </div>
            </Col>
            <Col lg={6} className="hero-image-container animate__animated animate__fadeIn animate__delay-2s">
              <div className="hero-image">
                <div className="floating-wish wish-1">
                  <FaStar className="wish-icon" />
                  <span>Travel to Japan</span>
                </div>
                <div className="floating-wish wish-2">
                  <FaStar className="wish-icon" />
                  <span>Learn Piano</span>
                </div>
                <div className="floating-wish wish-3">
                  <FaStar className="wish-icon" />
                  <span>Start a Business</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Features Section */}
      <section id="features" className="features-section">
        <Container>
          <h2 className="section-title animate__animated animate__fadeIn">Make Your Wishes Come True</h2>
          <p className="section-subtitle animate__animated animate__fadeIn">
            Wish Vault helps you capture, organize, and achieve your dreams
          </p>
          
          <Row className="feature-cards">
            <Col md={4} className="feature-card animate__animated animate__fadeIn animate__delay-1s">
              <div className="feature-icon">
                <FaRegHeart />
              </div>
              <h3>Create Wishes</h3>
              <p>Easily add your dreams and aspirations to your personal vault</p>
            </Col>
            
            <Col md={4} className="feature-card animate__animated animate__fadeIn animate__delay-2s">
              <div className="feature-icon">
                <FaStar />
              </div>
              <h3>Prioritize</h3>
              <p>Categorize and sort wishes based on importance and timeline</p>
            </Col>
            <Col md={4} className="feature-card animate__animated animate__fadeIn animate__delay-3s">
              <div className="feature-icon">
                <FaCheck />
              </div>
              <h3>Achievement Tracking</h3>
              <p>Track your progress and celebrate when wishes come true</p>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Testimonials Section */}
      <section className="testimonials-section">
        <Container>
          <h2 className="section-title animate__animated animate__fadeIn">What Our Users Say</h2>
          
          <Row className="testimonial-cards">
            <Col md={4} className="testimonial-card animate__animated animate__fadeIn animate__delay-1s">
              <div className="testimonial-content">
                <p>"Wish Vault helped me organize my dreams and actually achieve them. Best decision ever!"</p>
                <div className="testimonial-author">
                  <div className="author-avatar"></div>
                  <div className="author-info">
                    <h4>Sarah J.</h4>
                    <p>Wish Achiever</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={4} className="testimonial-card animate__animated animate__fadeIn animate__delay-2s">
              <div className="testimonial-content">
                <p>"I've always had trouble keeping track of my goals. This platform changed everything!"</p>
                <div className="testimonial-author">
                  <div className="author-avatar"></div>
                  <div className="author-info">
                    <h4>Michael T.</h4>
                    <p>Dream Chaser</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={4} className="testimonial-card animate__animated animate__fadeIn animate__delay-3s">
              <div className="testimonial-content">
                <p>"The visual approach to wish tracking makes it fun and keeps me motivated every day."</p>
                <div className="testimonial-author">
                  <div className="author-avatar"></div>
                  <div className="author-info">
                    <h4>Emma L.</h4>
                    <p>Goal Setter</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section animate__animated animate__fadeIn">
        <Container>
          <div className="cta-content">
            <h2>Ready to Start Making Wishes Come True?</h2>
            <p>Join thousands of dreamers who are turning their wishes into reality</p>
            <div className="cta-buttons">
              <Button 
                variant="primary" 
                size="lg" 
                className="signup-cta-btn"
                onClick={() => navigate("/signup")}
              >
                Create Account
              </Button>
              <Button 
                variant="outline-light" 
                size="lg" 
                className="login-cta-btn"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Footer */}
      <footer className="footer">
        <Container>
          <Row>
            <Col md={4}>
              <h3 className="footer-brand">✨ Wish Vault</h3>
             
            </Col>
            <Col md={4} className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}>Home</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate("/about"); }}>About</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate("/contact"); }}>Contact</a></li>
              </ul>
            </Col>
            <Col md={4} className="footer-social">
              <h4>Connect With Us</h4>
              <div className="social-icons">
                <a href="#" className="social-icon"><i className="fab fa-facebook"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
              </div>
            </Col>
          </Row>
          <Row className="footer-bottom">
            <Col>
              <p>&copy; {new Date().getFullYear()} Wish Vault. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;