import Swal from "sweetalert2";
import { author } from "../../firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { React, useState } from "react";
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import './login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Centralized login handler
    const handleLogin = async (email, password, isGuest = false) => {
        setIsLoading(true);
        setErrorMessage("");
        
        try {
            
            Swal.fire({
                title: 'Success!',
                text: isGuest ? 'Guest login successful!' : 'Logged in successfully!',
                icon: 'success',
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' }
            });
            
            navigate("/dashboard");
        } catch (err) {
            let errorText = isGuest 
                ? 'Failed to login as guest. Try again.' 
                : 'Invalid email or password.';
            
            switch (err.code) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                    errorText = isGuest ? 'Invalid guest credentials.' : errorText;
                    break;
                case 'auth/invalid-email':
                    errorText = 'Invalid email format.';
                    break;
                case 'auth/too-many-requests':
                    errorText = 'Too many attempts. Try later.';
                    break;
                case 'auth/network-request-failed':
                    errorText = 'Network error. Check connection.';
                    break;
            }
            
            setErrorMessage(errorText);
            Swal.fire({
                title: 'Error!',
                text: errorText,
                icon: 'error',
                showClass: { popup: 'animate__animated animate__shakeX' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' }
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Regular form submission
    const handlesubmitlogin = (e) => {
        e.preventDefault();
        const { email, password } = loginDetails;
        handleLogin(email, password);
    };

    // Guest login handler
    const handleGuestLogin = (e) => {
        e.preventDefault();
        handleLogin('guest@example.com', 'guestpassword', true); // Replace with actual credentials
    };

    const handleloginDetails = (e) => {
        setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
        setErrorMessage("");
    };

    return (
        <Container fluid className="login-container d-flex justify-content-center align-items-center">
            <Card className="login-card p-4 animate__animated animate__fadeIn">
                <Card.Body>
                    <Card.Title className="text-center mb-4 login-title">Welcome Back!</Card.Title>
                    <Form onSubmit={handlesubmitlogin}>
                        {/* Email and Password fields remain unchanged */}
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                onChange={handleloginDetails}
                                value={loginDetails.email}
                                required
                                className="login-input"
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                onChange={handleloginDetails}
                                value={loginDetails.password}
                                required
                                className="login-input"
                            />
                        </Form.Group>

                        {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}

                        <Button 
                            variant="primary" 
                            type="submit" 
                            className="w-100 login-button mb-3"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </Button>

                        {/* Guest Login Button */}
                        <Button 
                            variant="outline-secondary" 
                            className="w-100 guest-button mb-3"
                            onClick={handleGuestLogin}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Continue as Guest'}
                        </Button>

                        <Row className="text-center">
                            <Col>
                                <Button variant="link" className="login-link" onClick={() => navigate("/signup")}>
                                    Sign Up
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;