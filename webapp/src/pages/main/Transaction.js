import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { showSnack } from "../../comps/Snackbar";
import base_url from "../../Components/base_url";
import axios from "axios";

const Transaction = () => {
    const [balance, setBalance] = useState(0);
    const updateBalance = () => {
        axios.get(`${base_url}/customer/id/${user.customerId}`).then(
            (response) => {
                console.log(response.data)
                console.log("fetched user balance");
                setBalance(response.data.balance);
                console.log(balance);
            },
            (error) => {
                console.log("error fetching user balance");
                console.log(error);
            }
        )
    }
    useEffect(
       () => updateBalance(), []
    )
    const [transaction, setTransaction] = React.useState({
        transactionType : "Withdraw",
        amount : 0
    });
    const user = useSelector(state => state.user);
    const getLoan = (e) => {
        console.log(balance);
        e.preventDefault();
        console.log(transaction);
        if(transaction.amount > balance && transaction.transactionType === "Withdraw"){
            showSnack("Insufficient balance", "error");
            return 0;
        }
        if(transaction.amount <= 0){
            showSnack("Please enter a valid amount", "error");
            return 0;
        }
        axios.post(`${base_url}/transaction/${user.customerId}`, transaction).then(
            (response) => {
                console.log("Success");
                showSnack("Transaction Completed", "success")
                console.log(response.data);
                updateBalance();
            },
            (error) => {
                console.log("Error");
            }
        );

    }
    return(
        <div>
            <h1> This is Transaction</h1>
            <form onSubmit={getLoan} className="custom-control single" style={{width: "300px"}}>
                <div className="custom-section">
                    <label>Customer ID</label>
                    <p>{user.customerId}</p>
                </div>
                <div className="transaction-type-selector" style={{width: '600px'}}>
                    <label>Select Tansaction Type: </label><br></br>
                    <select value = {transaction.transactionType} onChange={(e) => {setTransaction({...transaction, transactionType : e.target.value})}}>
                        <option value="Withdraw">Withdraw</option>
                        <option value="Deposit">Deposit</option>
                    </select>
                </div>
                <div className="amount">
                    <label>Select amount</label>
                    <input type="Number" onChange={(e) => {setTransaction({...transaction, amount : e.target.value})}}></input>
                </div>
                <input type="submit" name="submit" id="submit" value={"Apply"} className="main-button" />
            </form>
        </div>
    );
}

export default Transaction;