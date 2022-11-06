import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import base_url from './base_url';
import { APP_CONSTANT } from './Constants';

const Login = () => {
    const[validate, setValidate] = useState({
        username : "",
        password : ""
    });

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(validate);
        check(validate);
    }

    const navigate = useNavigate();
    const check = (data) => {
        axios.post(`${base_url}/validate`, data).then(
            (response) => {
                console.log("Success");
                console.log(data);
                localStorage.setItem(APP_CONSTANT.isLoggedIn , "true");
                APP_CONSTANT.customerId = data.username;
                navigate("/App");
            },
            (error) => {
                console.log("Error");
                console.log(error);
                navigate("/Register")
                localStorage.clear();
            }
        );
    }
    return (
        <div className="text-center m-5-auto">
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <p>
                    <label>Customer ID</label><br/>
                    <input type="text" name="username" id="username" required onChange={(e) => {
                        setValidate({...validate, username: e.target.value})
                    }} />
                </p>
                <p>
                    <label>Password</label>
                    <br/>
                    <input type="password" name="password" id="password" required onChange={
                        (e) => {
                            setValidate({...validate, password: e.target.value})
                        }
                    }/>
                </p>
                <p>
                    <button id="sub_btn" type="submit">Login</button>
                </p>
            </form>
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}

export default Login;