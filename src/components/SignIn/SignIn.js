import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ErrorContext, UserContext } from '../../App';
import './SignIn.css'
import axios from "axios"
const SignIn = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useContext(ErrorContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = (e) => {
        const user = {
            username: userName,
            password: password
        }
        const url = `http://localhost:5000/api/auth/login`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (typeof (data) == 'object') {
                    setLoggedInUser(data);
                    sessionStorage.setItem('user',JSON.stringify(data.username));
                }
                else {
                    setErrorMessage(data)
                }
                history.replace(from);
            })
        e.preventDefault();
    }
    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm">
                <label>Username</label>
                <input onChange={(e) => setUserName(e.target.value)} type="text" className="loginInput" placeholder="Username" />
                <label>Password</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" className='loginInput' placeholder="Enter your Password" />
                <button onClick={(e) => { handleSignIn(e) }} className="loginButton">Sign In</button>
                <p style={{ fontWeight: 'bold' }} className="mt-4 text-center text-danger">
                    {errorMessage}
                </p>
            </form>
        </div>
    );
};

export default SignIn;