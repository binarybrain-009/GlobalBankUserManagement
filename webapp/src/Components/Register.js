import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import base_url from './base_url';
import { APP_CONSTANT } from './Constants';

const Register = () => {
    const[register, setRegister] = useState({
        fname : "",
        lname: "",
        password : "",
        phoneNo : "",
        email : "",
        address: "",
        date : "",
        occupation : "",
        city : "",
        balance : "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        input(register);    
    }

    const navigate = useNavigate();
    const input = (data) => {
        axios.post(`${base_url}/customer`, data).then(
            (response) => {
                setRegister(response.data);
                console.log("Success");
                console.log(data);
                //localStorage.setItem(APP_CONSTANT.isLoggedIn , "true");
                //APP_CONSTANT.customerId = data.username;
                navigate("/Login");
            },
            (error) => {
                console.log("Error");
                console.log(error);
                navigate("/Register")
                localStorage.clear();
            }
        );
    }

    return(
        <div className="text-center m-5-auto">
            <div id="formContainer">
                <form id="form" action="#" onSubmit={onSubmit}>
                    <fieldset>
                        <h1>Register</h1>
                        <div id="fullName">
                            <p>
                                <label>First name:</label>
                                <input type="text" name="fName" id="fName" placeholder="First Name" required onChange={(e) => {
                                setRegister({...register, fname: e.target.value})
                                }} />
                            </p>
                            <p>
                                <label>Last name:</label>
                                <input type="text" name="lName" id="lName" placeholder="Last Name" required onChange={(e) => {
                                setRegister({...register, lname: e.target.value})
                                }}/>
                            </p>
                            {/* <input type="text" name="mName" id="mName" placeholder="Middle Name" onChange={(e) => {
                            setRegister({...register, mname: e.target.value})
                            }}/> */}
                        </div>
                        <div id="otherInputs">
                            <p>
                                <label>Enter Password:</label>
                                <input type="password" name="pass" id="pass" placeholder="Enter password" required onChange={(e) => {
                                setRegister({...register, password: e.target.value})
                                }}/>
                            </p>
                            <p>
                                <label>Phone No.:</label>
                                <input type="tel" name="phone" id="phone" placeholder="Phone number" required onChange={(e) => {
                                setRegister({...register, phoneNo: e.target.value})
                                }} />   
                            </p>
                            <p>
                                <label>Email ID:</label>
                                <input type="email" name="email" id="email" placeholder="Email Address" required onChange={(e) => {
                                setRegister({...register, email: e.target.value})
                                }} />
                            </p>
                            <p>
                                <label>Address:</label>
                                <input type="address" name="address" id="address" placeholder="Address" required onChange={(e) => {
                                setRegister({...register, address: e.target.value})
                                }}/>
                            </p>
                            <p>
                                <label>City:</label>
                                <input type="text" name="city" id="city" placeholder="City" required onChange={(e) => {
                            setRegister({...register, city: e.target.value})
                            }}/>
                            </p>
                            <p>
                                <label>Occupation:</label>
                                <input type="text" name="occupation" id="occupation" placeholder="Occupation" onChange={(e) => {
                                setRegister({...register, occupation: e.target.value}) 
                                }}/>
                            </p>
                            <p>
                                <label>Date:</label>
                                <input type="text" name="dob" id="dob" placeholder="Enter date: DD-MM-YYYY" onChange={(e) => {
                            setRegister({...register, date: e.target.value}) 
                            }}/>   
                            </p>                                                 
                        </div>
                        <br /><br />
                        <input type="submit" name="submit" id="submit" />
                        </fieldset>
                </form>
                <footer>
                <p>Already a user? <Link to="/login">Sign In</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
            </div>
        </div>
    );
}

export default Register;