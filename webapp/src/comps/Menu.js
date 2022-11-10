import React from "react";
import {Nav, NavLink, NavItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import Logo from "./Logo";
import { BarChart2, BookOpen, DollarSign, PenTool, ShoppingBag } from "react-feather";

const Menu = () => {
    return (
        <Nav vertical className="col-md-12 d-none d-md-block bg-primaryc sidebar border-right sidebar-main">
          <div className="sidebar-brand">
          <Logo color="white" />
          </div>
        {/* <ListGroup>
            <Link className="list-group-item list-group-action" to="/App">Home</Link>
            <Link className="list-group-item list-group-action" to="/App/Loan">Loan</Link>
            <Link className="list-group-item list-group-action" to="/App/Transaction">Transaction</Link>
            <Link className="list-group-item list-group-action" to="/App/Statement">Statement</Link>
            <Link className="list-group-item list-group-action" onClick={() => {localStorage.clear()}} to="/">Logout</Link>
        </ListGroup> */}
        <NavItem>
          <BarChart2 size={21} />
          <NavLink to="/dashboard" tag={Link}>Dashboard</NavLink>
        </NavItem>
        <NavItem>
          {/* <BookOpen /> */}
          <ShoppingBag size={21} />
          <NavLink to="/loan" tag={Link}>Loan</NavLink>
        </NavItem>
        <NavItem>
          <DollarSign size={21} />
          <NavLink to="/transaction" tag={Link}>Transaction</NavLink>
        </NavItem>
        <NavItem>
          <PenTool size={21} />
          <NavLink to="/statement" tag={Link}>Statement</NavLink>
        </NavItem>
      </Nav>
    );
}

export default Menu;