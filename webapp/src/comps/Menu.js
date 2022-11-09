import React from "react";
import {Nav, NavLink, NavItem} from 'reactstrap';
import {Link} from 'react-router-dom';

const Menu = () => {
    return (
        <Nav vertical className="col-md-12 d-none d-md-block bg-primaryc sidebar border-right">
        {/* <ListGroup>
            <Link className="list-group-item list-group-action" to="/App">Home</Link>
            <Link className="list-group-item list-group-action" to="/App/Loan">Loan</Link>
            <Link className="list-group-item list-group-action" to="/App/Transaction">Transaction</Link>
            <Link className="list-group-item list-group-action" to="/App/Statement">Statement</Link>
            <Link className="list-group-item list-group-action" onClick={() => {localStorage.clear()}} to="/">Logout</Link>
        </ListGroup> */}
        <NavItem>
          <NavLink to="/" tag={Link}>Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/loan" tag={Link}>Loan</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/transaction" tag={Link}>Transaction</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/statement" tag={Link}>Statement</NavLink>
        </NavItem>
      </Nav>
    );
}

export default Menu;