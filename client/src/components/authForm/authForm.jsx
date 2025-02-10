import React, { useState } from 'react';
import './authForm.css';
import { Link } from 'react-router-dom'; // Import for navigation

const AuthForm = ({ onSubmit, isLogin }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit} className="auth-form">
        {!isLogin && (
          <>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <div className='auth-link-container'>
        <div className="auth-links">
          {isLogin ? (
            <>
              <Link to="/forgot-password" className="auth-link">Forgot Password?</Link>
              <p>
                Don't have an account? <Link to="/adminSignUp" className="auth-link">Sign Up</Link>
              </p>
            </>
          ) : (
            <p>
              Already have an account? <Link to="/login" className="auth-link">Login</Link>
            </p>
          )}
        </div>
        </div>
    </div>
  );
};

export default AuthForm;
