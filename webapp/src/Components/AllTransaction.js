import React from "react";
import { useLocation } from "react-router-dom";
import TransactionCard from "./TransactionCard";

const AllTransaction = () => {
    const [Transactions, useTransactions] = React.useState(useLocation().state.Transactions);
    return (
        <div>
            <h2>List of Transaction: </h2>
            {
                Transactions.length > 0 ? Transactions.map((item) => {
                    return <TransactionCard key={item.id} tran = {item} />
                }) : "No transaction in the period"
            }
        </div>
    );
}

export default AllTransaction;