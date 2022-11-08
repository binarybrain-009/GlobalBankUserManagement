import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import base_url from '../../Components/base_url';
import { useDispatch } from 'react-redux';
import login from "../../assets/login.svg"

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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const check = (data) => {
        axios.post(`${base_url}/validate`, data).then(
            (response) => {
                dispatch({type: "LOGIN", payload: {customerId: data.username, name: "Vivek", email: ""}}) // Should be updated later accordingly
                navigate("/");
            },
            (error) => {
                console.log("Error");
                console.log(error);
            }
        );
    }
    return (
        <>
            <h3>Login</h3>
            <form onSubmit={onSubmit} className="custom-control double">
                <div className='custom-section'>
                    <div className='custom-section w-100'>
                        <label>Customer ID </label>
                        <input type="text" name="username" placeholder='Enter Customer ID' onChange={(e) =>setValidate({...validate, username: e.target.value})} />
                    </div>
                    <div className='custom-section w-100'>
                        <label>Password</label>
                        <input type="password" name="password" placeholder='Enter Password' onChange={(e) => setValidate({...validate, password: e.target.value})}/>
                    </div>
                <button id="sub_btn" type="submit" className='auth-button mt-8'>Login</button>
                </div>
                <div className='custom-section'>
                    <img src={login} alt="Login Illustration" />
                </div>
            </form>
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </>
    )
}

export default Login;