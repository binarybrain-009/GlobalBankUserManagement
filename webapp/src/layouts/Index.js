import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import LandingHeader from "../comps/LandingHeader.js";

const Main = (props) => {
    
    const mainContent = React.useRef(null);

    return (
        <>
        <div className="main-content" ref={mainContent}>
                <div className="layout">
                    <LandingHeader />
                    <Outlet />
                </div>
            
        </div>
        </>
    );
};

export default Main;
