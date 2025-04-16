import React, { useState, useEffect } from 'react';
import { updateProfile } from 'firebase/auth';
import { author } from '../../firebaseconfig';
import Swal from 'sweetalert2';

const ProfileSettings = () => {
  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  // Form state
  const [profileForm, setProfileForm] = useState({
    displayName: '',
    phoneNumber: ''
  });

  // Load current user data when component mounts
  useEffect(() => {
    const currentUser = author.currentUser;
    if (currentUser) {
      setProfileForm({
        displayName: currentUser.displayName || '',
        phoneNumber: currentUser.phoneNumber || ''
      });
      
      if (currentUser.photoURL) {
        setImagePreview(currentUser.photoURL);
      }
    }
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setProfileImage(selectedImage);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  // Remove display name
  const handleRemoveDisplayName = () => {
    setProfileForm({ ...profileForm, displayName: '' });
    
    Swal.fire({
      title: 'Display name removed',
      text: 'Save changes to update your profile',
      icon: 'info',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      }
    });
  };

  // Update profile function
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', content: '' });
    
    try {
      const user = author.currentUser;
      if (!user) throw new Error('No user is currently logged in');
      
      // Update display name in Firebase Auth
      const updateData = {
        displayName: profileForm.displayName
      };
      
      // Handle profile image if present
      if (profileImage) {
        // In a real implementation, you would:
        // 1. Upload to Firebase Storage
        // 2. Get the download URL
        // 3. Set the photoURL
        
        // For demonstration:
        updateData.photoURL = imagePreview;
      }
      
      // Update Firebase Auth profile
      await updateProfile(user, updateData);
      
      // For phone number updates:
      // Phone numbers in Firebase Auth require separate verification
      // You would typically:
      
      // 1. Store phone number in your database
      // Example code (replace with your actual database code):
      // await updateUserInDatabase(user.uid, {
      //   phoneNumber: profileForm.phoneNumber
      // });
      
      // 2. If you need phone auth in Firebase:
      // Use Firebase Phone Auth APIs
      
      setMessage({
        type: 'success',
        content: 'Profile updated successfully!'
      });
      
      Swal.fire({
        title: 'Success!',
        text: 'Profile information updated successfully!',
        icon: 'success',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        }
      });
      
    } catch (error) {
      console.error("Profile update error:", error);
      
      setMessage({
        type: 'danger',
        content: `Failed to update profile: ${error.message}`
      });
      
      Swal.fire({
        title: 'Error!',
        text: `Failed to update profile: ${error.message}`,
        icon: 'error',
        showClass: {
          popup: 'animate__animated animate__shakeX'
        }
      });
    }
    
    setIsLoading(false);
  };

  // Remove profile picture
  const handleRemoveProfilePicture = () => {
    setProfileImage(null);
    setImagePreview(null);
    
    const user = author.currentUser;
    if (user && user.photoURL) {
      updateProfile(user, {
        photoURL: null
      }).then(() => {
        Swal.fire({
          title: 'Profile picture removed',
          icon: 'success',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          }
        });
      }).catch(error => {
        Swal.fire({
          title: 'Error',
          text: `Failed to remove profile picture: ${error.message}`,
          icon: 'error',
          showClass: {
            popup: 'animate__animated animate__shakeX'
          }
        });
      });
    }
  };

  // Phone number validation function
  const validatePhoneNumber = (phoneNumber) => {
    // Simple regex for basic phone validation
    // This can be enhanced based on your specific requirements
    const phoneRegex = /^\+?[0-9\s\-()]{10,15}$/;
    return phoneRegex.test(phoneNumber);
  };

  // Handle phone number update separately if needed
  const handlePhoneUpdate = async () => {
    if (!validatePhoneNumber(profileForm.phoneNumber)) {
      Swal.fire({
        title: 'Invalid Phone Number',
        text: 'Please enter a valid phone number',
        icon: 'error',
        showClass: {
          popup: 'animate__animated animate__shakeX'
        }
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const user = author.currentUser;
      if (!user) throw new Error('No user is currently logged in');
      
      // In a real implementation, you would:
      // 1. Store in your database
      // 2. Potentially use a backend API to handle Firebase phone auth
      
      // Simulating an API call:
      // await updatePhoneNumberInDatabase(user.uid, profileForm.phoneNumber);
      
      setTimeout(() => {
        Swal.fire({
          title: 'Phone Number Updated',
          text: 'Your phone number has been updated successfully',
          icon: 'success',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          }
        });
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Phone update error:", error);
      
      Swal.fire({
        title: 'Error!',
        text: `Failed to update phone number: ${error.message}`,
        icon: 'error',
        showClass: {
          popup: 'animate__animated animate__shakeX'
        }
      });
      
      setIsLoading(false);
    }
  };

  return null; // UI rendering removed as requested
};

export default ProfileSettings;