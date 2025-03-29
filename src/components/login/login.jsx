import Swal from "sweetalert2";
import { author } from "../../firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import {React,useState} from "react";
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import './login.css'
import {useNavigate} from 'react-router-dom'
const Login = () => {
    const navigate = useNavigate();
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: ""
    });

    const handleloginDetails = (e) => {
        setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
    };

    const handlesubmitlogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginDetails;
        try {
            await signInWithEmailAndPassword(author, email, password);
            Swal.fire({
                title: 'Success!',
                text: 'Logged in successfully!',
                icon: 'success',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown' // Animate.css animation
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp' // Animate.css animation
                }
            });
            navigate("/dashboard");
        } catch (err) {
            console.log(err);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to log in. Please check your credentials.',
                icon: 'error',
                showClass: {
                    popup: 'animate__animated animate__shakeX' // Animate.css animation
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp' // Animate.css animation
                }
            });
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
                                required
                                className="login-input"
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 login-button mb-3">
                            Login
                        </Button>

                        <Row className="text-center">
                            {/* <Col>
                                <Button variant="link" className="login-link" onClick={() => navigate("/forgot-password")}>
                                    Forgot Password?
                                </Button>
                            </Col> */}
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