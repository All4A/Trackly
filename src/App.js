import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Name:', name);
    console.log('Age:', age);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Nice to meet you!</h1>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="continue-button">
            Continue
          </button>
        </form>
        <div className="sign-in-link">
          Do you have an Account?{' '}
          <a href="/signin">Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default App;