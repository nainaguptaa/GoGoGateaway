import React from 'react';

import { useUserContext } from '../../context/userContext';
const Signup = () => {
  const { googleSignIn } = useUserContext();
  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h1>Create an ASDFASDFAccount</h1>
        <div className="input-container">
          <input className="auth-input" type="text" required />
          <div className="labelline">Email Address</div>
        </div>
        <span className="bg-gray-900 text-gray-300">
          Already Have an Accoun nURUBAt? Login
        </span>
        <div className="separator">
          <div className="line" />
          <span className="or">or</span>
          <div className="line" />
        </div>
        <button onClick={googleSignIn} className="googlesign">
          Sign In Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
