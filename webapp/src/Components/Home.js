import React  from "react";
import { Link } from 'react-router-dom'

const Home = () => {

    return (
        <div>
            <br />
            <i><h1>Welcome, user.fname</h1></i>
            <br /><br />
            <div>
                <i><h3>Apply for Loan</h3></i>
                <p>
                    Easily apply for loans at our registered branches! Simply enter your amount and click apply! <br />
                    <Link to="/loan">Apply</Link>
                </p>
            </div>
            <br />
            <div>
                <i><h3>Transact</h3></i>
                <p>
                    With our easy menu, deposits and withdrawals are easier than ever! <br />
                    <Link to="/transaction">Transact</Link>
                </p>
            </div>
            <br />
            <div>
                <i><h3>Generate statement</h3></i>
                <p>
                    Just enter the time period and leave the rest to us! <br />
                    <Link to="/statement">Generate</Link>
                </p>
            </div>

        </div>
    );
}

export default Home;