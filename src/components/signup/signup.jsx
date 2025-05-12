
import {React,useState} from "react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { author,database } from "../../firebaseconfig";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { set,ref } from "firebase/database";
import './sign.css';
import { Button, Form, Container, Card, Row, Col } from 'react-bootstrap';
const Signup = () => {
    const navigate = useNavigate(); 
    const [signupDetails, setSignupDetails] = useState({
        name: "",
        email: "",
        password: ""
        
    });

    const handleDetails = (e) => {
        setSignupDetails({ ...signupDetails, [e.target.name]: e.target.value });
    };

    const handelsubmitsignup = async (e) => {
        e.preventDefault();

        const { name, email, password} = signupDetails;
        try {
            const signupusers = await createUserWithEmailAndPassword(author, email, password);
            // const signupusercred = signupusers.user;
            // await updateProfile(signupusercred, {
            //     displayName: name
            // });

            Swal.fire({
                title: 'Success!',
                text: 'Signup done successfully!',
                icon: 'success',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown' // Animate.css animation
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp' // Animate.css animation
                }
            });
            await set(ref(database,"Users/"+name),{
                name:name,
                email:email,
                id:signupusers.user.uid
            })
            
            navigate("/login");
        } catch (err) {
            console.log(err);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to sign up. Please try again.',
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
        <Container fluid className="signup-container d-flex justify-content-center align-items-center">
            <Card className="signup-card p-4 animate__animated animate__fadeIn">
                <Card.Body>
                    <Card.Title className="text-center mb-4 signup-title">Create Your Account</Card.Title>
                    <Form onSubmit={handelsubmitsignup}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                onChange={handleDetails}
                                required
                                className="signup-input"
                            />
                        </Form.Group>

                        {/* <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select
                                name="role"
                                onChange={handleDetails}
                                className="signup-input"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </Form.Select>
                        </Form.Group> */}

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                onChange={handleDetails}
                                required
                                className="signup-input"
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                onChange={handleDetails}
                                required
                                className="signup-input"
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 signup-button mb-3">
                            Sign Up
                        </Button>

                        <Row className="text-center">
                            <Col>
                                <Button variant="primary" className="signup-link" onClick={() => navigate("/login")}>
                                    Already have an account? Login
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Signup;