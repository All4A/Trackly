import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Dashboard from './components/Dashboard/Dashboard';
import Statistics from './components/Statistics/Statistics'
import EditProfileForm from "./components/Accounts/EditProfileForm";
import NewHobby from "./components/NewHobby/NewHobby"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/accounts"  element={<EditProfileForm />} />
        <Route path="/newhobby" element={<NewHobby />} />
      </Routes>
    </Router>
  );
};

export default App;