import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

function Auth() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="auth">
      <div className="auth_form_container">
        {showLogin ? <Login /> : <Register />}
      </div>
      <div className="auth_toggle_section">
        <p className="auth_toggle_text">
          {!showLogin ? "Already have an account?" : "Don't have an account?"}
        </p>
        <button 
          className="auth_toggle_button" 
          onClick={() => setShowLogin(!showLogin)}
        >
          {!showLogin ? "Login" : "Register"}
        </button>
      </div>
    </div>
  );
}

export default Auth;
