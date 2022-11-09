import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import base_url from '../../Components/base_url';
import { useDispatch } from 'react-redux';
import login from "../../assets/login.svg"
import { showSnack } from '../../comps/Snackbar';

const Login = () => {
    const[validate, setValidate] = useState({
        username : "",
        password : ""
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if(validate.username==="" || validate.password === ""){
            showSnack("Please Enter all the credentials properly", "warning");
            return 0;
        }
        if(isNaN(validate.username)){ 
            showSnack("Please Enter a valid Customer ID", "warning");
            return 0;
        }
        axios.post(`${base_url}/validate`, validate).then(
            (response) => {
                console.log(response.data)
                dispatch({type: "LOGIN", payload: {customerId: validate.username, name: "Vivek", email: ""}}) // Should be updated later accordingly
                navigate("/");
            },
            (error) => {
                console.log("Error");
                console.log(error);
            }
        );
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
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