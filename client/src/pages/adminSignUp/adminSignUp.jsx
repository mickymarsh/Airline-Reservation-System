import React, { useState } from 'react';
import AuthForm from '../../components/authForm/authForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminSignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // State to store success message

  const handleSignUp = async (formData) => {
    try {
      const response = await axios.post('/user/signUpAdmin', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
  
      const data = response.data;
      localStorage.setItem('token', data.token); // Save the token
      console.log('User registered successfully');
      setSuccess('User registered successfully');
       // Clear the success message after 5 seconds
      setTimeout(() => {
        setSuccess('');
        navigate('/adminLogin'); // Redirect to the homepage after 5 seconds
      }, 1000);
      
    } catch (err) {
    //   console.error(err);
        //setError(err.response ? err.response.data : err.message);
        console.error(err);
        setError(err.response ? err.response.data : err.message);
      // Automatically clear the error message after 5 seconds
        setTimeout(() => {
        setError('');
        }, 1000);
    }
  };
  
  return (
    <div className="auth-page">
      <h1>Admin Sign Up</h1>
      <AuthForm onSubmit={handleSignUp} isLogin={false} />
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default AdminSignUp;