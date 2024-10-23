/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AuthForms from './components/AuthForms'; // Make sure this file exists
import Home from './components/Home'; // Import Home component

const App = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<AuthForms />} />
        <Route path="/home" element={<Home />} /> {/* Add route for Home */}
      </Routes>
    </Router>
  );
};

export default App;
