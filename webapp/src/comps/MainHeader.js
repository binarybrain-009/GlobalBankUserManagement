import React from "react";
import { User } from "react-feather";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarText, DropdownMenu, DropdownToggle, UncontrolledDropdown, DropdownItem } from "reactstrap";
import { useSelector } from "react-redux";
import axios from 'axios';
import base_url from '../Components/base_url';
const MainHeader = () => {
    const[fname, setFname] = React.useState("") ;
    const user = useSelector(state => state.user);
    React.useEffect(
        () => {
            axios.get(`${base_url}/customer/id/${user.customerId}`).then(
                (response) => {
                    setFname(response.data.fname);
                },
                (error) => {
                    console.log(error);
                }
            )
    },[fname])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <Navbar className="navbar">
            <NavbarBrand>
                    {/* <Logo /> */}

            </NavbarBrand>
            <NavbarText>
                <UncontrolledDropdown >
                    <DropdownToggle nav>
                        <User size={21} />
                    </DropdownToggle>
                    <DropdownMenu end>
                        <DropdownItem >Hi {fname}!</DropdownItem>
                        <DropdownItem  onClick={()=>navigate('/')}>Landing</DropdownItem>
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