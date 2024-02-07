import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Auth/Signup';
import LandingPage from './pages/LandingPage/LandingPage';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />\
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
