import React from "react";
import { Button, Container, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import './navbar.css'
const Navbar1=()=>{
    const nav = useNavigate();

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
            <Container>
                <Navbar.Brand href="#home" className="navbar-brand">Wish Well</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home" className="nav-link">Wishes</Nav.Link>
                        <Nav.Link href="#features" className="nav-link">Activity</Nav.Link>
                        <Nav.Link href="#pricing" className="nav-link"></Nav.Link>
                    </Nav>
                    <div className="navbar-buttons">
                        <Button 
                            variant="outline-light" 
                            className="navbar-button" 
                            onClick={() => nav("/signup")}
                        >
                            Signup
                        </Button>
                        <Button 
                            variant="outline-light" 
                            className="navbar-button" 
                            onClick={() => nav("/login")}
                        >
                            Login
                        </Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Navbar1;