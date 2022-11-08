import axios from "axios";
import React from "react";
import base_url from "./base_url";
import { APP_CONSTANT } from "./Constants";

const Statement = () => {
    const [daterange, setdaterange] = React.useState({start: null, end: null});
    const [customerId, setcustomerId] = React.useState(null); // This is temporary, it will be later fetched from localstorage or redux
    const getStatement = (e) => {
        e.preventDefault()
        if(daterange.start === null || daterange.end === null){
            console.log("error on dates") // snackbar 
            return 0;
        }
        console.log(daterange)
        axios.post(`${base_url}/topdf/${APP_CONSTANT.customerId}`, daterange).then(
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
            <form onSubmit={getStatement}>
                <div className="my-4">
                    <label>Customer ID</label>
                    <p>{APP_CONSTANT.customerId}</p>
                </div>
                <div className="my-4">
                    <label>Transaction Period From</label>
                    <input type="date" onChange={(e)=>setdaterange({...daterange, start: e.target.value})} placeholder="Period From" />
                </div>
                <div className="my-4">
                    <label>Transaction Period To</label>
                    <input type="date" onChange={(e)=>setdaterange({...daterange, end: e.target.value})} placeholder="Period To" />
                </div>
                        <input type="submit" name="submit" id="submit" value={"Apply"} />
            </form>
        </div>
    );
}

export default Statement;