import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import {
  updatePassword,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { author } from "../../firebaseconfig";
import Swal from "sweetalert2";
import "./settings.css";

const Settings = () => {
  const [activeSection, setActiveSection] = useState("account");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });

  // Form states
  const [emailForm, setEmailForm] = useState({
    username: "",
    email: "",
    currentPassword: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Load current user data when component mounts
    const currentUser = author.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setEmailForm((prev) => ({
        ...prev,
        email: currentUser.email || "",
        username: currentUser.displayName || "",
      }));
    }
  }, []);

  // Helper function to reauthenticate user
  const reauthenticateUser = async (password) => {
    if (!user) return false;

    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      return true;
    } catch (error) {
      console.error("Reauthentication failed:", error);
      setMessage({
        type: "danger",
        content: "Authentication failed. Please check your password.",
      });
      return false;
    }
  };

  // Handle password update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", content: "" });

    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    if (newPassword !== confirmPassword) {
      setMessage({
        type: "danger",
        content: "New passwords do not match",
      });
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setMessage({
        type: "danger",
        content: "Password must be at least 6 characters long",
      });
      setIsLoading(false);
      return;
    }

    try {
      // First reauthenticate
      const authenticated = await reauthenticateUser(currentPassword);
      if (!authenticated) {
        setIsLoading(false);
        return;
      }

      // Then update password
      await updatePassword(user, newPassword);

      setMessage({
        type: "success",
        content: "Password updated successfully!",
      });

      // Clear password fields
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Password update error:", error);
      setMessage({
        type: "danger",
        content: `Failed to update password: ${error.message}`,
      });
    }

    setIsLoading(false);
  };

  // Input change handlers
  const handleEmailFormChange = (e) => {
    setEmailForm({ ...emailForm, [e.target.name]: e.target.value });
  };

  const handlePasswordFormChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  // Render sidebar navigation
  const renderSidebar = () => {
    return (
      <div className="settings-sidebar">
        <h3 className="settings-sidebar-title">Settings</h3>
        <ul className="settings-nav">
          <li className={activeSection === "account" ? "active" : ""}>
            <button
              onClick={() => setActiveSection("account")}
              className="settings-nav-link"
            >
              Account
            </button>
          </li>
          <li className={activeSection === "security" ? "active" : ""}>
            <button
              onClick={() => setActiveSection("security")}
              className="settings-nav-link"
            >
              Security
            </button>
          </li>
          {/* <li className={activeSection === 'privacy' ? 'active' : ''}>
            <button 
              onClick={() => setActiveSection('privacy')}
              className="settings-nav-link"
            >
              Privacy
            </button>
          </li> */}
          {/* <li className={activeSection === 'notifications' ? 'active' : ''}>
            <button 
              onClick={() => setActiveSection('notifications')}
              className="settings-nav-link"
            >
              Notifications
            </button>
          </li> */}
        </ul>
      </div>
    );
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "account":
        return (
          <div className="settings-content">
            <h2 className="settings-content-title">Account Settings</h2>
            {/* <p className="settings-content-subtitle">Manage your account information</p> */}

            {message.content && (
              <Alert
                variant={message.type}
                dismissible
                onClose={() => setMessage({ type: "", content: "" })}
              >
                {message.content}
              </Alert>
            )}

            <div className="settings-card">
              {/* <h4>Email Address</h4> */}
              {/* <p className="text-muted">Change your email address</p> */}

              <Form>
                {/* <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={emailForm.username || (user ? user.displayName : "")}
                    onChange={handleEmailFormChange}
                    disabled
                  />
                  <small className="text-muted">
                    Currently logged in as: {emailForm.username || (user ? user.displayName : "Not logged in")}
                  </small>
                </Form.Group> */}
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={emailForm.email}
                    onChange={handleEmailFormChange}
                    disabled
                  />
                </Form.Group>

                

               
              </Form>
            </div>

            
          </div>
        );

      case "security":
        return (
          <div className="settings-content">
            <h2 className="settings-content-title">Security Settings</h2>
            <p className="settings-content-subtitle">
              Manage your account security settings
            </p>

            {message.content && (
              <Alert
                variant={message.type}
                dismissible
                onClose={() => setMessage({ type: "", content: "" })}
              >
                {message.content}
              </Alert>
            )}


            <div className="settings-card">
              <h4>Change Password</h4>
              <p className="text-muted">
                Update your password to keep your account secure
              </p>

              <Form onSubmit={handlePasswordUpdate}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={emailForm.email}
                    onChange={handleEmailFormChange}
                    disabled
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordFormChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordFormChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordFormChange}
                    required
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="settings-save-btn"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update Password"}
                </Button>
              </Form>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="settings-container">
      <Container fluid>
        <Row>
          <Col lg={3} md={4} className="settings-sidebar-col">
            {renderSidebar()}
          </Col>
          <Col lg={9} md={8} className="settings-content-col">
            {renderContent()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Settings;