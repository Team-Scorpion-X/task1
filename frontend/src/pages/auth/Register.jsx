import React, { useState } from 'react';
import axios from 'axios';
import './register.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    user_name: '',
    university: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateInputs = () => {
    const newErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required.';
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required.';
    }

    if (!formData.user_name.trim()) {
      newErrors.user_name = 'Username is required.';
    }

    if (!formData.university.trim()) {
      newErrors.university = 'University is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email must be valid.';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 3) {
      newErrors.password = 'Password must be at least 3 characters long.';
    }

    if (!formData.confirm_password.trim()) {
      newErrors.confirm_password = 'Confirm password is required.';
    } else if (formData.confirm_password !== formData.password) {
      newErrors.confirm_password = 'Confirm password does not match the password.';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccessMessage('');
    const validationErrors = validateInputs();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return; // Don't submit if there are validation errors
    }

    try {
      // Adjust the endpoint URL to match your backend route
      const response = await axios.post('/api/auth/register', formData);
      setSuccessMessage(response.data.message);
      setFormData({
        first_name: '',
        last_name: '',
        user_name: '',
        university: '',
        email: '',
        password: '',
        confirm_password: '',
      });
      setErrors({});
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setServerError(err.response.data.message || 'Server error occurred.');
      } else {
        setServerError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem' }}>
      <h2>Register</h2>
      {serverError && <div style={{ color: 'red', marginBottom: '1rem' }}>{serverError}</div>}
      {successMessage && <div style={{ color: 'green', marginBottom: '1rem' }}>{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="first_name">First Name</label><br />
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem' }}
          />
          {errors.first_name && <span style={{ color: 'red' }}>{errors.first_name}</span>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="last_name">Last Name</label><br />
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem' }}
          />
          {errors.last_name && <span style={{ color: 'red' }}>{errors.last_name}</span>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="user_name">Username</label><br />
          <input
            type="text"
            id="user_name"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem' }}
          />
          {errors.user_name && <span style={{ color: 'red' }}>{errors.user_name}</span>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="university">University</label><br />
          <input
            type="text"
            id="university"
            name="university"
            value={formData.university}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem' }}
          />
          {errors.university && <span style={{ color: 'red' }}>{errors.university}</span>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email">Email</label><br />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem' }}
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password">Password</label><br />
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem' }}
          />
          {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="confirm_password">Confirm Password</label><br />
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem' }}
          />
          {errors.confirm_password && <span style={{ color: 'red' }}>{errors.confirm_password}</span>}
        </div>

        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Register</button>
      </form>
    </div>
  );
};

export default Registration;
