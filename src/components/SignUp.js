import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      alert('Please agree to the Terms of Service.');
      return;
    }
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Name:', name);
    console.log('Age:', age);
  };

  return (
    <div className="signup-container">
      <h2>Sign Up Now</h2>
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
        <input
          type="text"
          placeholder="How can we call you?"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        <input
          type="number"
          placeholder="What is your age?"
          value={age}
          onChange={(e) => setAge(e.target.value)}
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
        <button type="submit" className="create-account-btn">Create an Account</button>
      </form>
      <p>Do you have an Account? <a href="/signin">Sign In</a></p>
    </div>
  );
};

export default SignUp;