
import React, { useState } from 'react';

export default function RegisterPage() {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, username, password }),
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        alert('Registration successful');
        return window.location.href = '/login';
        
      } else {
        alert('Registration failed');
      }

    } catch (error) {
      console.error(error);
    }
    
    
  };

    return (
        <div className="wrapper" onSubmit={register}>
            <form action="#">
                <h2>Register</h2>
                <div className="input-field">
                    <input type="text"
                    value={fullname} 
                    onChange={e => setFullname(e.target.value)} required />
                    <label>Enter your full name</label>
                </div>
                <div className="input-field">
                    <input type="text"
                    value={username} 
                    onChange={e => setUsername(e.target.value)} required />
                    <label>Enter your username</label>
                </div>
                <div className="input-field">
                    <input type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} required />
                    <label>Enter your password</label>
                </div>
                
                <button type="submit">Create Account</button>
                <div className="register">
                    <p>Already have an account? <a href="#">Login</a></p>
                </div>
            </form>
        </div>
    );
}
