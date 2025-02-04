import React, { useState } from 'react';
import AuthForm from '../../components/authForm/authForm';
import { useNavigate } from 'react-router-dom';

const AdminSignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSignUp = async (formData) => {
    try {
      const response = await fetch('user/signUpAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Save the token
      navigate('/'); // Redirect to the home page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <h1>Admin Sign Up</h1>
      <AuthForm onSubmit={handleSignUp} isLogin={false} />
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AdminSignUp;