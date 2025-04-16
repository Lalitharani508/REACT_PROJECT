import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { updatePassword, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { author } from '../../firebaseconfig';
import Swal from 'sweetalert2';
import './settings.css';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('account');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  
  // Form states
  const [emailForm, setEmailForm] = useState({
    email: '',
    currentPassword: ''
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // Load current user data when component mounts
    const currentUser = author.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setEmailForm(prev => ({ ...prev, email: currentUser.email || '' }));
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
        type: 'danger',
        content: 'Authentication failed. Please check your password.'
      });
      return false;
    }
  };

  // Handle email update
  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', content: '' });
    
    try {
      // First reauthenticate
      const authenticated = await reauthenticateUser(emailForm.currentPassword);
      if (!authenticated) {
        setIsLoading(false);
        return;
      }
      
      // Then update email
      await updateEmail(user, emailForm.email);
      
      setMessage({
        type: 'success', 
        content: 'Email updated successfully!'
      });
      
      // Clear password field
      setEmailForm(prev => ({ ...prev, currentPassword: '' }));
    } catch (error) {
      console.error("Email update error:", error);
      setMessage({
        type: 'danger',
        content: `Failed to update email: ${error.message}`
      });
    }
    
    setIsLoading(false);
  };

  // Handle password update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', content: '' });
    
    const { currentPassword, newPassword, confirmPassword } = passwordForm;
    
    if (newPassword !== confirmPassword) {
      setMessage({
        type: 'danger',
        content: 'New passwords do not match'
      });
      setIsLoading(false);
      return;
    }
    
    if (newPassword.length < 6) {
      setMessage({
        type: 'danger',
        content: 'Password must be at least 6 characters long'
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
        type: 'success', 
        content: 'Password updated successfully!'
      });
      
      // Clear password fields
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error("Password update error:", error);
      setMessage({
        type: 'danger',
        content: `Failed to update password: ${error.message}`
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
          <li className={activeSection === 'account' ? 'active' : ''}>
            <button 
              onClick={() => setActiveSection('account')}
              className="settings-nav-link"
            >
              Account
            </button>
          </li>
          <li className={activeSection === 'security' ? 'active' : ''}>
            <button 
              onClick={() => setActiveSection('security')}
              className="settings-nav-link"
            >
              Security
            </button>
          </li>
          <li className={activeSection === 'privacy' ? 'active' : ''}>
            <button 
              onClick={() => setActiveSection('privacy')}
              className="settings-nav-link"
            >
              Privacy
            </button>
          </li>
          <li className={activeSection === 'notifications' ? 'active' : ''}>
            <button 
              onClick={() => setActiveSection('notifications')}
              className="settings-nav-link"
            >
              Notifications
            </button>
          </li>
        </ul>
      </div>
    );
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'account':
        return (
          <div className="settings-content">
            <h2 className="settings-content-title">Account Settings</h2>
            <p className="settings-content-subtitle">Manage your account information</p>
            
            {message.content && (
              <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', content: '' })}>
                {message.content}
              </Alert>
            )}
            
            <div className="settings-card">
              <h4>Email Address</h4>
              <p className="text-muted">Change your email address</p>
              
              <Form onSubmit={handleEmailUpdate}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={emailForm.email}
                    onChange={handleEmailFormChange}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="currentPassword"
                    value={emailForm.currentPassword}
                    onChange={handleEmailFormChange}
                    placeholder="Enter your current password to verify"
                    required
                  />
                </Form.Group>
                
                <Button 
                  type="submit" 
                  className="settings-save-btn" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Update Email'}
                </Button>
              </Form>
            </div>
            
            <div className="settings-card">
              <h4>Delete Account</h4>
              <p className="text-muted">Once you delete your account, there is no going back. Please be certain.</p>
              <Button 
                variant="danger" 
                className="settings-delete-btn"
              >
                Delete Account
              </Button>
            </div>
          </div>
        );
        
      case 'security':
        return (
          <div className="settings-content">
            <h2 className="settings-content-title">Security Settings</h2>
            <p className="settings-content-subtitle">Manage your account security settings</p>
            
            {message.content && (
              <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', content: '' })}>
                {message.content}
              </Alert>
            )}
            
            <div className="settings-card">
              <h4>Change Password</h4>
              <p className="text-muted">Update your password to keep your account secure</p>
              
              <Form onSubmit={handlePasswordUpdate}>
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
                  {isLoading ? 'Updating...' : 'Update Password'}
                </Button>
              </Form>
            </div>
            
            <div className="settings-card">
              <h4>Two-Factor Authentication</h4>
              <p className="text-muted">Add an extra layer of security to your account</p>
              <Form.Check 
                type="switch"
                id="two-factor-auth"
                label="Enable Two-Factor Authentication"
                className="mb-3"
              />
              <Button 
                variant="outline-primary" 
                className="settings-outline-btn"
              >
                Configure 2FA
              </Button>
            </div>
          </div>
        );
        
      case 'privacy':
        return (
          <div className="settings-content">
            <h2 className="settings-content-title">Privacy Settings</h2>
            <p className="settings-content-subtitle">Manage your privacy preferences</p>
            
            <div className="settings-card">
              <h4>Wishlist Privacy</h4>
              <p className="text-muted">Control who can see your wishlists</p>
              
              <Form.Group className="mb-3">
                <Form.Label>Default Wishlist Visibility</Form.Label>
                <Form.Select aria-label="Default wishlist visibility">
                  <option value="public">Public - Anyone can see</option>
                  <option value="friends">Friends Only - Only friends can see</option>
                  <option value="private">Private - Only you can see</option>
                </Form.Select>
              </Form.Group>
              
              <Button className="settings-save-btn">
                Save Privacy Settings
              </Button>
            </div>
            
            <div className="settings-card">
              <h4>Activity Visibility</h4>
              <p className="text-muted">Control what others can see about your activity</p>
              
              <Form.Check 
                type="switch"
                id="show-activity"
                label="Show my activity to others"
                className="mb-2"
                defaultChecked
              />
              
              <Form.Check 
                type="switch"
                id="show-online"
                label="Show when I'm online"
                className="mb-3"
                defaultChecked
              />
              
              <Button className="settings-save-btn">
                Save Activity Settings
              </Button>
            </div>
          </div>
        );
        
      case 'notifications':
        return (
          <div className="settings-content">
            <h2 className="settings-content-title">Notification Settings</h2>
            <p className="settings-content-subtitle">Manage how you receive notifications</p>
            
            <div className="settings-card">
              <h4>Email Notifications</h4>
              <p className="text-muted">Control what emails you receive from us</p>
              
              <Form.Check 
                type="switch"
                id="email-wishlist"
                label="Wishlist updates"
                className="mb-2"
                defaultChecked
              />
              
              <Form.Check 
                type="switch"
                id="email-friend"
                label="Friend requests and activities"
                className="mb-2"
                defaultChecked
              />
              
              <Form.Check 
                type="switch"
                id="email-promotions"
                label="Promotions and newsletters"
                className="mb-3"
              />
              
              <Button className="settings-save-btn">
                Save Email Preferences
              </Button>
            </div>
            
            <div className="settings-card">
              <h4>Push Notifications</h4>
              <p className="text-muted">Control what push notifications you receive</p>
              
              <Form.Check 
                type="switch"
                id="push-wishlist"
                label="Wishlist updates"
                className="mb-2"
                defaultChecked
              />
              
              <Form.Check 
                type="switch"
                id="push-friend"
                label="Friend requests and activities"
                className="mb-2"
                defaultChecked
              />
              
              <Form.Check 
                type="switch"
                id="push-messages"
                label="New messages"
                className="mb-3"
                defaultChecked
              />
              
              <Button className="settings-save-btn">
                Save Push Notification Settings
              </Button>
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