import React, { useState } from 'react';
import { useContext } from 'react';
import { Navigate,Link } from 'react-router-dom';
import { UserContext } from '../Usercontext';

export default function LoginPage() {
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);

    async function login(e){
        e.preventDefault();
        try{
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        const data = await response.json();
        console.log(data);
        if (response.status === 200) {
            setUserInfo(data);
            setRedirect(true);
        }
        else{
            alert('Invalid credentials');
        }
    }
        catch(error){
            console.error(error);
        }  
    } 
    if(redirect){
        return window.location.href = '/';
    } 

    return (
        <div className="wrapper" onSubmit={login}>
            <form action="#">
                <h2>Login</h2>
                <div className="input-field">
                    <input type="text"
                    value={username}    
                     onChange={(e)=>setUsername(e.target.value)}
                     required />
                    <label>Enter your username</label>
                </div>
                <div className="input-field">
                    <input type="password" 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required />
                    <label>Enter your password</label>
                </div>
                <div className="forget">
                    <label htmlFor="remember">
                        <input type="checkbox" id="remember" />
                        <p>Remember me</p>
                    </label>
                    <a href="#">Forgot password?</a>
                </div>
                <button type="submit">Log In</button>
                <div className="register">
                    <p>Don't have an account? <a href="#">Register</a></p>
                </div>
            </form>
        </div>
    );
}