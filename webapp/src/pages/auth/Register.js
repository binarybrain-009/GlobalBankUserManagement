import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import base_url from '../../Components/base_url';
import { showSnack } from '../../comps/Snackbar';

const Register = () => {
    const [cid, setCid] = useState("Not Found");
    useEffect(
        () => {
            axios.get(`${base_url}/lastid`).then(
                (response) => {
                    setCid(response.data);
                    // console.log(cid);
                },
                (error) => {
                    console.log(error);
                }
            )
    },[cid])

    const[register, setRegister] = useState({
        fname : "",
        lname: "",
        password : "",
        phoneNo : "",
        email : "",
        dob : "",
        // address: "",
        occupation : "",
        city : "",
        balance : 0,
    });

    const onSubmit = (e) => {
        e.preventDefault();
        for( var key in register) {
            if(register[key]===""){
                showSnack("Please Enter all the Credentials properly", "warning");
                return 0;
            }
        }
        if(register.password.length < 8){
            showSnack("Password must be atleast 8 characters", "warning")
            return 0;
        }
        if(register.phoneNo.match(/\d/g).length!==10){
            showSnack("Password Enter a valid Phone number", "warning")
            return 0;
        }
        axios.post(`${base_url}/customer`, register).then(
            (response) => {
                setRegister(response.data);
                // console.log("Success");
                // console.log(data);
                showSnack("Customer Registration Successful", "success")
                navigate("/login");
            },
            (error) => {
                console.log("Error");
                console.log(error);
                navigate("/Register")
                localStorage.clear();
            }
        );
    }

    const navigate = useNavigate();

    return(
        <>
            <h3>Register</h3>
            <form id="form" action="#" onSubmit={onSubmit} className="custom-control double">
                <div className="custom-section">
                    <label>Customer ID</label>
                    <input type="text" name="cid" id="cid" placeholder="Customer ID"  value={cid} disabled />
                </div>
                <div className="custom-section">
                    <label>First name</label>
                    <input type="text" name="fName" id="fName" placeholder="First Name"  onChange={(e) =>setRegister({...register, fname: e.target.value})} />
                </div>
                <div className="custom-section">
                    <label>Last name</label>
                    <input type="text" name="lName" id="lName" placeholder="Last Name"  onChange={(e) =>setRegister({...register, lname: e.target.value})} />
                </div>
                <div className="custom-section">
                    <label>Password</label>
                    <input type="password" name="pass" id="pass" placeholder="Enter Password"  onChange={(e) =>setRegister({...register, password: e.target.value})} />
                </div>
                <div className="custom-section">
                    <label>Phone No.</label>
                    <input type="tel" name="phone" id="phone" placeholder="Phone number"  onChange={(e) => setRegister({...register, phoneNo: e.target.value})} />
                </div>
                <div className="custom-section">
                    <label>Email ID</label>
                    <input type="email" name="email" id="email" placeholder="Email Address"  onChange={(e) =>setRegister({...register, email: e.target.value})} />
                </div>
                {/* <div className="custom-section">
                    <label>Address</label>
                    <input type="address" name="address" id="address" placeholder="Address"  onChange={(e) =>setRegister({...register, address: e.target.value})} />
                </div> */}
                <div className="custom-section">
                    <label>City</label>
                    <input type="text" name="city" id="city" placeholder="City"  onChange={(e) => setRegister({...register, city: e.target.value})} />
                </div>
                <div className="custom-section">
                    <label>Occupation</label>
                    <input type="text" name="occupation" id="occupation" placeholder="Occupation" onChange={(e) =>setRegister({...register, occupation: e.target.value})} />
                </div>
                <div className="custom-section">
                    <label>Date</label>
                    <input type="date" name="dob" id="dob" placeholder="Enter date: DD-MM-YYYY" onChange={(e) => setRegister({...register, dob: e.target.value}) } />
                </div>
                <input type="submit" name="submit" id="submit" className='auth-button' />
            </form>
            <footer>
                <p>Already a user? <Link to="/login">Sign In</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </>
    );
}

export default Register;