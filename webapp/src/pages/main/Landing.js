import React from "react";
import { UncontrolledCarousel } from 'reactstrap';
import bank1 from "../../assets/bank1.jpg"
import bank2 from "../../assets/bank2.jpg"
import bank3 from "../../assets/bank3.jpg"
import { Link } from "react-router-dom";

const Landing = () => {
    const items = [
        {
          src: bank1,
          altText: 'Slide 1',
        },
        {
          src:bank2,
          altText: 'Slide 2',
        },
        {
          src:bank3,
          altText: 'Slide 3',
        },
      ];
      
    return (
        <>
            <UncontrolledCarousel items={items}  />
            <div className="p-3">
            <div className="main-card mb-3">
                <div className="card-title">
                    <h4>Our Services</h4>
                </div>
                <div className="card-body">
                    <ul>
                        <li>Loans</li>
                        <li>Banking</li>
                        <li>Wealth Management</li>
                    </ul>
                </div>
            </div>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr",gridGap: "20px"}}>
                <div className="main-card">
                    <div className="card-title" ><h4>Apply for Loan</h4></div>
                    <div className="card-body" ><p>
                        Easily apply for loans at our registered branches! Simply enter your amount and click apply! <br />
                        <Link to="/loan">Apply</Link>
                    </p></div>
                </div>
                <div className="main-card">
                    <div className="card-title" ><h4>Transact</h4></div>
                    <div className="card-body" ><p>
                        With our easy menu, deposits and withdrawals are easier than ever! <br />
                        <Link to="/transaction">Transact</Link>
                    </p></div>
                </div>
                <div className="main-card">
                    <div className="card-title" ><h4>Generate statement</h4></div>
                    <div className="card-body" ><p>
                        Just enter the time period and leave the rest to us! <br />
                        <Link to="/statement">Generate</Link>
                    </p></div>
                </div>

            </div>
            </div>
        </>
    )
}

export default Landing;