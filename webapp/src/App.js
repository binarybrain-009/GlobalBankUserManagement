import {Container, Row, Col} from 'reactstrap';
import {Routes, Route} from 'react-router-dom';
import Header from './Components/Header';
import Menu from './Components/Menu';
import Home from './Components/Home';
import Transaction from './Components/Transaction';
import Statement from './Components/Statement';
import Loan from './Components/Loan';
import axios from 'axios';
import base_url from './Components/base_url';
import { useEffect } from 'react';
import { APP_CONSTANT } from './Components/Constants';

function App() {
  let customer;
  const cid = Number(APP_CONSTANT.customerId);
  useEffect(
    () => {
      console.log(APP_CONSTANT)
      axios.get(`${base_url}/customer/id/${cid}`).then(
        (reponse) => {
          customer = reponse.data;
          console.log(customer);
        },
        (error) => {
          console.log(error);
        }
      )
    }, []
  )
  return (
    <div>
      <Container>
        <Header />
        <Row>
          <Col md = {4}>
            <Menu />
          </Col>
          <Col md = {8}>
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/Loan' element={<Loan />}/>
              <Route path='/Transaction' element={<Transaction />}/>
              <Route path='/Statement' element={<Statement />}/>
            </Routes>
          </Col>
        </Row>
      </Container>
    </div>
);
}

export default App;
