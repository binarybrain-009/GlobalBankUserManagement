import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import base_url from "../../Components/base_url";
import { showSnack } from "../../comps/Snackbar";

const Loan = () => {
    const [loan, setLoan] = React.useState({
        branch : "Hyderabad",
        amount : 0
    });
    const user = useSelector(state => state.user);
    const getLoan = (e) => {
        e.preventDefault();
        console.log(loan);
        if(loan.amount > 100000){
            showSnack("Loan limit of 100000 exceeded", "error");
            return 0;
        }
        if(loan.amount <= 0){
            showSnack("Please enter a valid amount", "error");
            return 0;
        }
        axios.post(`${base_url}/loan/${user.customerId}`, loan).then(
            (response) => {
                console.log(response);
                console.log("Success");
                showSnack("Successfully applied for loan", "success")
                console.log(response.data);
            },
            (error) => {
                console.log("Error");
            }
        );

    }
    return(
        <div>
            <h1> Apply for Loan</h1>
            <form onSubmit={getLoan} className="custom-control single" style={{width: "300px"}}>
                <div className="custom-section">
                    <label>Customer ID</label>
                    <p>{user.customerId}</p>
                </div>
                <div className="branch-selection" style={{width: '600px'}}>
                    <label>Select Branch: </label><br></br>
                    <select value = {loan.branch} onChange={(e) => {setLoan({...loan, branch : e.target.value})}}>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Chennai">Chennai</option>
                    </select>
                </div>
                <div className="amount">
                    <label>Select amount</label>
                    <input type="Number" onChange={(e) => {setLoan({...loan, amount : e.target.value})}}></input>
                </div>
                <input type="submit" name="submit" id="submit" value={"Apply"} className="main-button" />
            </form>
        </div>
    );
}

export default Loan;