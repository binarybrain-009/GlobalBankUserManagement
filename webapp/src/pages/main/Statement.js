import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import base_url from "../../Components/base_url";
import { showSnack } from "../../comps/Snackbar";

const Statement = () => {
    const [daterange, setdaterange] = React.useState({start: null, end: null});
    const user = useSelector(state => state.user);
    const getStatement = (e) => {
        e.preventDefault()
        if(daterange.start === null || daterange.end === null){
            showSnack("Please enter valid dates", "error")
            return 0;
        }
        console.log(daterange)
        axios.post(`${base_url}/topdf/${user.customerId}`, daterange).then(
            (response) => {
                console.log("Success");
                console.log(response.data);
            },
            (error) => {
                console.log("Error");
            }
        );

    }
    return(
        <div>
            <h1> This is Statement</h1>
            <form onSubmit={getStatement} className="custom-control single" style={{width: "300px"}}>
                <div className="custom-section">
                    <label>Customer ID</label>
                    <p>{user.customerId}</p>
                </div>
                <div className="custom-section">
                    <label>Transaction Period From</label>
                    <input type="date" onChange={(e)=>setdaterange({...daterange, start: e.target.value})} placeholder="Period From" />
                </div>
                <div className="custom-section">
                    <label>Transaction Period To</label>
                    <input type="date" onChange={(e)=>setdaterange({...daterange, end: e.target.value})} placeholder="Period To" />
                </div>
                <div className="custom-section">
                    <label>Transaction Period To</label>
                    <input type="date" onChange={(e)=>setdaterange({...daterange, end: e.target.value})} placeholder="Period To" />
                </div>
                <input type="submit" name="submit" id="submit" value={"Apply"} className="main-button" />
            </form>
        </div>
    );
}

export default Statement;