import React from "react";
import {Card, CardBody, Row, Col} from 'reactstrap';

const TransactionCard = ({tran}) => {
    return (
        <Card>
            <CardBody>
                <Row>
                    <Col md={3}>Id : {tran.transactionId}</Col>
                    <Col md={3}>Date: {tran.transactionDate}</Col>
                    <Col md={3}>Type: {tran.transactionType}</Col>
                    <Col md={3}>Amount: {tran.amount}</Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default TransactionCard;