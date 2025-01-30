import React, { useState } from 'react';
import './SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="sign-in-btn">Sign In</button>
      </form>
      <p>Don't have an Account? <a href="/signup">Sign Up</a></p>
    </div>
  );
};

export default SignIn;