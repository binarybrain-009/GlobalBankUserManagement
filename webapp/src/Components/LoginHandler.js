import React from 'react';
import { useEffect } from 'react';
import {useNavigate } from 'react-router-dom'
import { APP_CONSTANT } from './Constants';

const LoginHandler = () => {
    const navigate = useNavigate();
    useEffect(
        () => {
            const token = localStorage.getItem(APP_CONSTANT.isLoggedIn);
            if(token){
                navigate("/App");
            }else{
                navigate("/Login");
            }
        },
        []
    )
    return (
        <div></div>
    );
}

export default LoginHandler;