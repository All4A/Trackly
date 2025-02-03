import React, { useState } from 'react';
import './SignIn.css';
import ApiClient from '../../api-client/src/ApiClient';
import AuthApi from '../../api-client/src/api/AuthApi';
import {useNavigate} from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

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
      setLoading(true);
      setError(null);
      authApi.apiAuthLoginPost(formData, (error, data, response) => {
        setLoading(false);
        if (error) {
          setError(error || 'An error occurred during logging in.');
        } else {
          setSuccess(true);
          console.log('Login successful:', data);
          console.log(data.token);
          navigate('/dashboard');
        }
      }
    )
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="password"
          name="password"
          placeholder="Your password"
          value={formData.password}
          onChange={handleChange}
          className="input-field"
        />
        <button type="submit" className="sign-in-btn">Sign In</button>
      </form>
      <p>Don't have an Account? <a href="/signup">Sign Up</a></p>
    </div>
  );
};

export default SignIn;