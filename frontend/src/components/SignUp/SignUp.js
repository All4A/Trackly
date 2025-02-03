import React, { useState } from 'react';
import ApiClient from '../../api-client/src/ApiClient';
import AuthApi from '../../api-client/src/api/AuthApi';
import { useNavigate } from "react-router-dom";
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    date_of_birth: '',
  });

  const [agreeTerms, setAgreeTerms] = useState(false);

  const apiClient = new ApiClient("http://89.169.172.168:8080");
  const authApi = new AuthApi(apiClient);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      alert('Please agree to the Terms of Service.');
      return;
    }

    setLoading(true);
    setError(null);

    authApi.apiAuthRegisterPost(
      formData,
      (error, data, response) => {
        setLoading(false);
        if (error) {
          setError(error || 'An error occurred during registration.');
        } else {
          setSuccess(true);
          console.log('Registration successful:', data);
          navigate('/dashboard');
        }
      }
    );
  };

  return (
    <div className="signup-container">
      <h2>Sign Up Now</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Your password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          placeholder="How can we call you?"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="date"
          placeholder="Your date of birth"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          className="input-field"
        />
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="terms"
            checked={agreeTerms}
            onChange={() => setAgreeTerms(!agreeTerms)}
          />
          <label htmlFor="terms">I agree to the Terms of Service.</label>
        </div>
        <button type="submit" className="create-account-btn">
          Create an Account
        </button>
      </form>
      <p>
        Do you have an Account?{' '}
        <a href="/">Sign In</a>
      </p>
    </div>
  );
};

export default SignUp;