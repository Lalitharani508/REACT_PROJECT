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

    // Centralized login handler for registered users
    const handleLogin = async (email, password) => {
        setIsLoading(true);
        setErrorMessage("");
        
        try {
            // Use Firebase authentication for users
            const userCredential = await signInWithEmailAndPassword(author, email, password);
            const user = userCredential.user;
            
            // Store user info in session
            sessionStorage.setItem('userRole', 'registered');
            sessionStorage.setItem('userId', user.uid);
            
            Swal.fire({
                title: 'Success!',
                text: 'Logged in successfully!',
                icon: 'success',
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' }
            });
            
            navigate("/dashboard");
        } catch (err) {
            let errorText = 'Invalid email or password.';
            
            switch (err.code) {
                case 'author/user-not-found':
                case 'author/wrong-password':
                    errorText = 'Invalid email or password.';
                    break;
                case 'author/invalid-email':
                    errorText = 'Invalid email format.';
                    break;
                case 'author/too-many-requests':
                    errorText = 'Too many attempts. Try later.';
                    break;
                case 'author/network-request-failed':
                    errorText = 'Network error. Check connection.';
                    break;
                default:
                    errorText = `Login error: ${err.message}`;
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

    // Form submission
    const handlesubmitlogin = (e) => {
        e.preventDefault();
        const { email, password } = loginDetails;
        handleLogin(email, password);
    };

    const handleloginDetails = (e) => {
        setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
        setErrorMessage("");
    };
    const handleguestlogin=(e)=>{
        e.preventDefault
        const {email, password} = {email: "guest@gmail.com", password: "123456"}
        handleLogin(email, password)

        
    }
 

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

                        {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}

                        <Button 
                            variant="primary" 
                            type="submit" 
                            className="w-100 login-button mb-3"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </Button>
                        <Button onClick={handleguestlogin} className="w-100">Continue as Guest</Button>

                        <Row className="text-center">
                            <Col>
                                <Button variant="info" className="login-link" onClick={() => navigate("/signup")}>
                                    SignUp
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