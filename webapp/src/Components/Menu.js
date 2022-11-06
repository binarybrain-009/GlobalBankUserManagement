import React from "react";
import {ListGroup} from 'reactstrap';
import {Link} from 'react-router-dom';

const Menu = () => {
    return (
        <ListGroup>
            <Link className="list-group-item list-group-action" to="/App">Home</Link>
            <Link className="list-group-item list-group-action" to="/App/Loan">Loan</Link>
            <Link className="list-group-item list-group-action" to="/App/Transaction">Transaction</Link>
            <Link className="list-group-item list-group-action" to="/App/Statement">Statement</Link>
            <Link className="list-group-item list-group-action" onClick={() => {localStorage.clear()}} to="/">Logout</Link>
        </ListGroup>
    );
}

export default Menu;