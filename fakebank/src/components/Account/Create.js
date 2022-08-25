import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

async function createAccount(AccDetails) {
    console.log(AccDetails);
    return fetch('http://localhost:9005/api/fakebank/account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(AccDetails)
    }).then(data => data.json())
}

export default function CreateAccount() {
    const [userName, setUserName] = useState();
    const [fullName, setFullName] = useState();
    const [mobileNumber, setMobileNumber] = useState();
    const [dob, setDob] = useState();
    const [ssn, setSsn] = useState();
    
    const handleSubmit = async event => {
        event.preventDefault();
        const accountBalance = 0;
        let todayDate = new Date();
        let date = todayDate.getDate();
        let month = todayDate.getMonth();
        let year = todayDate.getFullYear();
        let expiryYear = todayDate.getFullYear() + 3;
        let dateSeparator = '-';
        const createDt = `${month}${dateSeparator}${date}${dateSeparator}${year}`;
        const ccExpiry = `${month}${dateSeparator}${date}${dateSeparator}${expiryYear}`;

        const cvvMin = 100;
        const cvvMax = 999;
        const ccCvv = cvvMin + Math.random() * (cvvMax - cvvMin);

        const ccNumMin = 1000;
        const ccNumMax = 9999;
        let cardFirstSeg = ccNumMin + Math.random() * (ccNumMax - ccNumMin);
        let cardSecondSeg = ccNumMin + Math.random() * (ccNumMax - ccNumMin);
        let cardThirdSeg = ccNumMin + Math.random() * (ccNumMax - ccNumMin);
        let cardFourthSeg = ccNumMin + Math.random() * (ccNumMax - ccNumMin);
        const ccNumber = `${cardFirstSeg}${dateSeparator}${cardSecondSeg}${dateSeparator}${cardThirdSeg}${dateSeparator}${cardFourthSeg}`;

        const Account_details = await createAccount({
            ssn,
            dob,
            fullName,
            userName,
            mobileNumber,
            ccNumber,
            ccCvv,
            ccExpiry,
            accountBalance,
            createDt
        });
        console.log(Account_details);
      };
    return(
        <div>
            <h2>Add New Credit Card Account</h2>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col xs={6}>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter CipherTrust Manager Username" onChange={e => setUserName(e.target.value)} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
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
                        <Col xs={6}></Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
}