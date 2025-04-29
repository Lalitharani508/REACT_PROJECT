import Swal from "sweetalert2";
import { author } from "../../firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import {React, useState} from "react";
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import './login.css'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: ""
    });
    // Add loading state
    const [isLoading, setIsLoading] = useState(false);
    // Add error message state
    const [errorMessage, setErrorMessage] = useState("");

    const handleloginDetails = (e) => {
        setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
        // Clear any previous error when user starts typing
        setErrorMessage("");
    };

    const handlesubmitlogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
        const { email, password } = loginDetails;
        
        console.log("Attempting login with:", { email }); // Log for debugging (don't log password)
        
        try {
            if (!author) {
                throw new Error("Firebase auth object is not initialized");
            }
            
            await signInWithEmailAndPassword(author, email, password);
            console.log("Login successful");
            
            Swal.fire({
                title: 'Success!',
                text: 'Logged in successfully!',
                icon: 'success',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
            
            navigate("/dashboard");
        } catch (err) {
            console.error("Login error:", err.code, err.message);
            
            // Set more specific error messages based on Firebase error codes
            let errorText = 'Failed to log in. Please check your credentials.';
            
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                errorText = 'Invalid email or password. Please try again.';
            } else if (err.code === 'auth/invalid-email') {
                errorText = 'Invalid email format.';
            } else if (err.code === 'auth/too-many-requests') {
                errorText = 'Too many failed login attempts. Please try again later.';
            } else if (err.code === 'auth/network-request-failed') {
                errorText = 'Network error. Please check your connection.';
            }
            
            setErrorMessage(errorText);
            
            Swal.fire({
                title: 'Error!',
                text: errorText,
                icon: 'error',
                showClass: {
                    popup: 'animate__animated animate__shakeX'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container fluid className="login-container d-flex justify-content-center align-items-center">
            <Card className="login-card p-4 animate__animated animate__fadeIn">
                <Card.Body>
                    <Card.Title className="text-center mb-4 login-title">Welcome Back!</Card.Title>
                    <Form onSubmit={handlesubmitlogin}>
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

                        {errorMessage && (
                            <div className="text-danger mb-3">
                                {errorMessage}
                            </div>
                        )}

                        <Button 
                            variant="primary" 
                            type="submit" 
                            className="w-100 login-button mb-3"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
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