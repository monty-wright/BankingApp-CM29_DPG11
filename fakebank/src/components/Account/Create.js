import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import useToken from '../../useToken';
import jwt_decode from "jwt-decode";

async function createAccount(AccDetails) {
    return fetch('http://localhost:8081/api/proxy/account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(AccDetails)
    }).then(data => data.json())
}

export default function CreateAccount() {
    const { token } = useToken();
    var decodedToken = jwt_decode(token);
    
    const [fullName, setFullName] = useState();
    const [mobileNumber, setMobileNumber] = useState();
    const [dob, setDob] = useState();
    const [ssn, setSsn] = useState();
    const [accFriendlyName, setAccFriendlyName] = useState();
    const cmID = decodedToken.sub;
    const userName = decodedToken.preferred_username;
    const handleSubmit = async event => {
        event.preventDefault();
        const Account_details = await createAccount({
            ssn,
            dob,
            fullName,
            userName,
            mobileNumber,
            cmID,
            accFriendlyName
        });
        console.log(Account_details);
      };
    return(
        <div>
            <Card>
            <Card.Header>Register New Credit Card</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col xs={6}>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" value={decodedToken.preferred_username}
                                disabled={true} />
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                        <Form.Group className="mb-3" controlId="formBasicSSN">
                            <Form.Label>SSN</Form.Label>
                            <Form.Control type="password" placeholder="Ssn" onChange={e => setSsn(e.target.value)} />
                            <Form.Text className="text-muted">
                                We'll never share your info with anyone else.
                            </Form.Text>
                        </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6}>
                        <Form.Group className="mb-3" controlId="formBasicFullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" placeholder="FullName" onChange={e => setFullName(e.target.value)} />
                        </Form.Group>
                        </Col>
                        <Col xs={6}>
                        <Form.Group className="mb-3" controlId="formBasicContactNumber">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control type="text" placeholder="ContactNumber" onChange={e => setMobileNumber(e.target.value)} />
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <Form.Group className="mb-3" controlId="formBasicDateOfBirth">
                                <Form.Label>Date Of Birth</Form.Label>
                                <Form.Control type="date" placeholder="DateOfBirth" onChange={e => setDob(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group className="mb-3" controlId="formBasicFriendlyNameAcc">
                                <Form.Label>Account Friendly Name</Form.Label>
                                <Form.Control type="text" placeholder="AccFriendlyName" onChange={e => setAccFriendlyName(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
            </Card>
        </div>
    );
}