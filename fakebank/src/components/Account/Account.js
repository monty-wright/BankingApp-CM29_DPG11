import {React, useEffect, useState} from 'react';
import useToken from '../../useToken';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { Accordion } from 'react-bootstrap';

function Account() {
  const [accounts, setAccounts] = useState();
  const { token } = useToken();
  var decodedToken = jwt_decode(token);

  useEffect(() => {
    getAllAccounts();
  }, []);
  
  const getAllAccounts = () => {
    axios
      .get('http://localhost:8080/api/fakebank/accounts/' + decodedToken.preferred_username)
      .then((res) => {
        setAccounts(res.data.accounts);
      })
      .catch((err) => console.log(err));
  };  

  console.log(accounts[0]);
  return(
    
    <div></div>
  )
}

export default Account;