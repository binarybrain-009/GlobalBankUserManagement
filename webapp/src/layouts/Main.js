import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import MainHeader from "../comps/MainHeader.js";
import Menu from "../comps/Menu.js";
import { Col, Row } from "reactstrap";
import { showSnack } from "../comps/Snackbar.js";

const Main = (props) => {
    
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    useEffect(()=> {
        if(user.customerId === undefined || user.customerId === "") {
            showSnack("You need to login before going in", "error")
            navigate("/login")
        }
        else{
            console.log("")
        }
    },[navigate, user])
    const mainContent = React.useRef(null);

    return (
        <>
        <div className="main-content" ref={mainContent}>
            {/* <Row className="mx-0">
                <Col xs={2} id="sidebar-wrapper" className="p-0"> */}
                    <Menu />
                {/* </Col>
                <Col xs={10} id="page-content-wrapper"> */}
                <div className="layout">
            <MainHeader />
                    <Outlet />
                </div>
                {/* </Col>
            </Row> */}
            
        </div>
        </>
    );
};

export default Main;
