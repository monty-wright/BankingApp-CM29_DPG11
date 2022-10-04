import {React, useEffect, useState} from 'react';
import useToken from '../../useToken';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { data } from 'autoprefixer';

function Account() {
  const [accounts, setAccounts] = useState("");
  const { token } = useToken();
  var decodedToken = jwt_decode(token);

  useEffect(() => {
    console.log(decodedToken.preferred_username);
    /*axios
      .get('http://localhost:8081/api/proxy/accounts/'+decodedToken.preferred_username+'/'+ decodedToken.preferred_username)
      .then((res) => {
        setAccounts(res.data.accounts);
      })
      .catch((err) => console.log(err));*/
      data = {"userName":"ccaccountowner","accounts":[{"expDate":"12/04/2025","ccNumber":"2000101000100730-2184-1768-3759","cvv":"373","friendlyName":"Walmart MC","balance":"0"},{"expDate":"12/04/2025","ccNumber":"2000101000100730-2184-1768-3759","cvv":"373","friendlyName":"Costco MC","balance":"0"}]}
      setAccounts(data.accounts);
    }, []);
  
  const cards = {};
  for (const account of accounts) {
    if (account.friendlyName in cards) {
      cards[account.friendlyName].push(account);
    } else {
      cards[account.friendlyName] = [account];
    }
  }
  
  return(   
    <div className="container px-6 mx-auto">
      {/* Remove class [ h-64 ] when adding a card block */}
      <div className="rounded shadow relative bg-white z-10 -mt-8 mb-8 w-full">
      
      {/* <Accordion> */}
      {Object.entries(cards).map((entry) => {
        const card = entry[0];
        const details = entry[1];
        return (
          <>
          <div className="w-full flex items-center justify-center">
            <div className="xl:w-1/3 sm:w-1/3 w-full 2xl:w-1/3 flex flex-col items-center py-16 md:py-12 bg-gradient-to-r from-indigo-700 to-purple-500 rounded-lg">
                <div className="w-full flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <img src="https://cdn.tuk.dev/assets/webapp/master_layouts/boxed_layout/boxed_layout2.jpg" alt="profile" />
                        <p className="mt-2 text-xs sm:text-sm md:text-base font-semibold text-center text-white">{decodedToken.preferred_username}</p>
                    </div>
                </div>
                <div className="flex items-center mt-7">
                    <div className>
                        <p className="text-xs text-gray-300">Card Number</p>
                        <p className="mt-2 text-base sm:text-xs md:text-xs 2xl:text-xs text-gray-50">{details[0].ccNumber}</p>
                    </div>
                    <div className="ml-12">
                        <p className="text-xs text-gray-300">CVV</p>
                        <p className="mt-2 text-base sm:text-xs md:text-xs 2xl:text-xs text-gray-50">{details[0].cvv}</p>
                    </div>
                    <div className="ml-12">
                        <p className="text-xs text-gray-300">Expiry Date</p>
                        <p className="mt-2 text-base sm:text-xs md:text-xs 2xl:text-xs text-gray-50">{details[0].expDate}</p>
                    </div>
                </div>
            </div>
          </div>
          <hr />
          </>
        );
        /*
          <Accordion.Item eventKey={card} key={card}>
            <Accordion.Header>{card}</Accordion.Header>
            <Accordion.Body>
              <Container>
                <Row>
                  <Col sm={3}>Credit Card Number</Col>
                  <Col sm={3}>{details[0].ccNumber}</Col>
                </Row>
                <Row>
                  <Col sm={3}>CVV</Col>
                  <Col sm={3}>{details[0].cvv}</Col>
                </Row>
                <Row>
                  <Col sm={3}></Col>
                  <Col sm={3}></Col>
                </Row>
              </Container>              
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
    */
    })}
    </div></div>
  )
}

export default Account;