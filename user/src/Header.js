import React, { useState,useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './Usercontext';
export default function Header() {
    const {setUserInfo, userInfo} = useContext(UserContext);
    useEffect(() => {
        fetch('http://localhost:4000/profile', { 
            credentials: 'include', })
            .then(res => res.json().then((userInfo) => setUserInfo(userInfo)));
    }, []);
    

    function logout() {
        setUserInfo(null);

        fetch('http://localhost:4000/logout', { 
            credentials: 'include',
            method: 'POST',});
        
    }

    const username = userInfo?.username;
    
    return (
        <header>
            <Link to="" class="logo">
                MyBlog
            </Link>
            <nav>
                {username && (
                    <>
                    <span>Hello, {username}</span>
                    <Link to="/">Home</Link>
                    <Link to="/create">Create new post</Link>
                    <a onClick={logout}>Logout</a>
                    </>
                )}
                {!username && (
                    <>
                <Link to="/">Home</Link>
                <Link to="/about-me">About</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                </>
                )}
            </nav>
        </header>
    );
}