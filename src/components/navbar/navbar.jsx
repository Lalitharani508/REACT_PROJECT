import React, { useState, useEffect } from "react";
import { Button, Container, Navbar, Nav } from "react-bootstrap";
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaRegHeart, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import './navbar.css';

const Navbar1 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    
    // Track scroll position for navbar effects
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    // Check if the nav link is active
    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <>
        <Navbar 
            bg="transparent" 
            variant="dark" 
            expand="lg" 
            fixed="top"
            className={`animate__animated animate__fadeIn custom-navbar ${scrolled ? 'navbar-scrolled' : ''}`}
        >
            <Container>
                <Navbar.Brand 
                    onClick={() => navigate("/")} 
                    className="navbar-brand animate__animated animate__pulse animate__infinite animate__slow"
                >
                    <span className="brand-text">✨ Wish Vault</span>
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />
                
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        {/* <Nav.Link 
                            onClick={() => navigate("/")}
                            className={`nav-link mx-2 animate__animated animate__fadeIn ${isActive("/") ? "active-link" : ""}`}
                        >
                            <FaHome className="nav-icon" /> Home
                        </Nav.Link>
                        <Nav.Link 
                            onClick={() => navigate("/wishes")}
                            className={`nav-link mx-2 animate__animated animate__fadeIn animate__delay-1s ${isActive("/wishes") ? "active-link" : ""}`}
                        >
                            <FaRegHeart className="nav-icon" /> Wishes
                        </Nav.Link> */}
                    </Nav>
                    
                    <div className="navbar-buttons animate__animated animate__fadeIn animate__delay-1s">
                        <Button 
                            variant="outline-light" 
                            className="navbar-button signup-btn"
                            onClick={() => navigate("/signup")}
                        >
                            <FaUserPlus className="btn-icon" /> Signup
                        </Button>
                        <Button 
                            variant="primary" 
                            className="navbar-button login-btn ms-3"
                            onClick={() => navigate("/login")}
                        >
                            <FaSignInAlt className="btn-icon" /> Login
                        </Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    );
}

export default Navbar1;