import React from "react";
import { User } from "react-feather";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarText, DropdownMenu, DropdownToggle, UncontrolledDropdown, DropdownItem } from "reactstrap";
import Logo from "./Logo";

const MainHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <Navbar color="primary">
            <NavbarBrand>
                    <Logo />

            </NavbarBrand>
            <NavbarText>
                <UncontrolledDropdown >
                    <DropdownToggle nav>
                        <User size={21} />
                    </DropdownToggle>
                    <DropdownMenu end>
                        <DropdownItem>Profile</DropdownItem>
                        <DropdownItem>Settings</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={()=>{dispatch({type: "LOGOUT"});navigate("/login")}}>Logout</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </NavbarText>
        </Navbar>
        // <nav className="navbar navbar-expand-lg bg-light">
        //     <div className="container-fluid">
        //         <a className="navbar-brand" href="#">
        //         </a>
        //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        //         <span className="navbar-toggler-icon"></span>
        //         </button>
        //             <div>
        //                 <a href="/profile">
        //                     <User size={21} />
        //                 </a>
        //             </div>
        //     </div>
        //     </nav>
    )
}

export default MainHeader;