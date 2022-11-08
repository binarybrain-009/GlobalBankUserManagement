import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import authbg from "../assets/bank.jpg"

const Auth = (props) => {

    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    useEffect(()=> {
        // console.log(user)
        if(user.customerId !== undefined) {
            navigate("/")
        }
    },[navigate, user])

    const mainContent = React.useRef(null);

    return (
        <>
            <div className="main-content" ref={mainContent}>
                <img src={authbg} className="auth-bg" alt="Auth Background" />
                <div className="auth-card center">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Auth;
