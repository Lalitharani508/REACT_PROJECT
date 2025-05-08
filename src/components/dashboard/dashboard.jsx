import React, { useState } from "react";
import { signOut } from 'firebase/auth';
import { author } from "../../firebaseconfig";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, Container, Button, Offcanvas } from 'react-bootstrap';
import { FaSignOutAlt, FaGift, FaShare, FaCog, FaList, FaBars } from 'react-icons/fa';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';


const Dashboard = () => {
  const navigate = useNavigate();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  
  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);
  
  const logout = async () => {
    try {
      await signOut(author);
      
      Swal.fire({
        title: 'Success!',
        text: 'You have been logged out successfully',
        icon: 'success',
        confirmButtonColor: '#6c5ce7',
        timer: 2000
      });
      
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to log out. Please try again.',
        icon: 'error',
        confirmButtonColor: '#d63031'
      });
      console.error("Error signing out:", error);
    }
  };

  const navLinkClass = "animate__animated animate__fadeIn";
  const navItems = [
    { path: "/wishlist", icon: <FaList className="me-2" />, text: "Wishlist" },
    { path: "/giftideas", icon: <FaGift className="me-2" />, text: "Gift Ideas" },
    // { path: "/share", icon: <FaShare className="me-2" />, text: "Share" },
    { path: "/settings", icon: <FaCog className="me-2" />, text: "Settings" }
  ];

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" className="animate__animated animate__fadeInDown">
        <Container fluid>
          <Navbar.Brand href="#" className="fs-3 fw-bold animate__animated animate__pulse animate__infinite">
            My Wishlist
          </Navbar.Brand>
          
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            onClick={handleShow} 
            className="border-0">
            <FaBars />
          </Navbar.Toggle>
          
          {/* Desktop Navigation */}
          <Nav className="me-auto d-none d-lg-flex">
            {navItems.map((item, index) => (
              <Nav.Link 
                as={Link} 
                to={item.path} 
                key={index} 
                className={navLinkClass} 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.icon} {item.text}
              </Nav.Link>
            ))}
          </Nav>
          
          <Button 
            variant="outline-light" 
            onClick={logout} 
            className="d-none d-lg-flex align-items-center animate__animated animate__fadeIn"
          >
            <FaSignOutAlt className="me-2" /> Logout
          </Button>
        </Container>
      </Navbar>

      {/* Mobile Navigation Offcanvas */}
      <Offcanvas show={showOffcanvas} onHide={handleClose} placement="end" className="bg-dark text-light">
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title className="fw-bold">Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {navItems.map((item, index) => (
              <Nav.Link 
                as={Link} 
                to={item.path} 
                key={index} 
                className="py-3 border-bottom border-secondary animate__animated animate__fadeInRight" 
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={handleClose}
              >
                {item.icon} {item.text}
              </Nav.Link>
            ))}
            
            <Button 
              variant="danger" 
              onClick={logout} 
              className="mt-4 d-flex align-items-center justify-content-center animate__animated animate__fadeInUp"
              style={{ animationDelay: "0.4s" }}
            >
              <FaSignOutAlt className="me-2" /> Logout
            </Button>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Dashboard;