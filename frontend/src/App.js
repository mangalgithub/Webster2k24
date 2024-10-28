import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPageBuyer from './Components/LoginPageBuyer';
import SignUpPageBuyer from './Components/SignupPageBuyer';
import SignUpPageSeller from './Components/SignupPageSeller';
import LoginPageSeller from './Components/LoginPageSeller';
import MainPage from './Components/MainPage';

function App() {
  return (
    <>
     
        <Router>
          <Routes>
             <Route path="/" element={<MainPage />} />
            <Route path="/buyer/login" element={<LoginPageBuyer />} />
            <Route path="/buyer/signup" element={<SignUpPageBuyer />} />
            <Route path="/seller/signup" element={<SignUpPageSeller />} />
            <Route path="/seller/login" element={<LoginPageSeller />} />
          </Routes>
        </Router>
    </>
  );
}

export default App;
