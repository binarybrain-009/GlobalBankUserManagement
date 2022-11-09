import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import base_url from "../../Components/base_url";
import { showSnack } from "../../comps/Snackbar";

const Statement = () => {
    const [Transactions, setTransactions] = React.useState([])
    const [daterange, setdaterange] = React.useState({
        "startDate" : "",
        "endDate" : ""
    });
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const getStatement = (e) => {
        e.preventDefault()
        console.log(new Date());
        if(daterange.startDate === null || daterange.endDate === null){
            showSnack("Please enter valid dates", "error")
            return 0;
        }
        if(new Date(daterange.startDate) > new Date()){
            showSnack("Please enter valid dates", "error");
            return 0;
        }
        console.log(daterange)
        console.log(`${base_url}/topdf/${user.customerId}`);
        axios.post(`${base_url}/topdf/${user.customerId}`, daterange).then(
            (response) => {
                console.log("Success");
                setTransactions(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
    }
    useEffect(
        () => {
            console.log(Transactions)
            if(Transactions.length > 0){
                navigate("/listOfStatements", {state:{Transactions}});
            }
            if(Transactions.length === 0 && !(daterange.startDate === "" || daterange.endDate === "")){
                showSnack("No Transactions Found for the days", "error")
            }
        }, [Transactions]
    )
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
                    <input type="date" onChange={(e)=>setdaterange({...daterange, startDate: e.target.value})} placeholder="Period From" />
                </div>
                <div className="custom-section">
                    <label>Transaction Period To</label>
                    <input type="date" onChange={(e)=>setdaterange({...daterange, endDate: e.target.value})} placeholder="Period To" />
                </div>
                <input type="submit" name="submit" id="submit" value={"Apply"} className="main-button" />
            </form>
        </div>
    );
}

export default Statement;