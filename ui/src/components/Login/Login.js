import React, { useState, useEffect } from 'react';
import './Login.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

async function loginUser(credentials) {
 console.log(credentials);
 return fetch('http://'+process.env.REACT_APP_BACKEND_IP_ADDRESS+':8080/api/fakebank/signin/', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login() {
  const navigate = useNavigate();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = async e => {
    e.preventDefault();
    
    const auth_response = await loginUser({
      username,
      password
    });
    sessionStorage.setItem('token', auth_response.jwt);
    sessionStorage.setItem('basic', btoa(username + ':' + password))
    let token = sessionStorage.getItem('token');
    var decodedToken = jwt_decode(token);
    if((decodedToken.preferred_username === 'cccustomersupport') ||(decodedToken.preferred_username === 'everyoneelse'))
      navigate('/auth/admin/home');
    else
      navigate('/auth/user/home');
    
  }

  useEffect(() => {
    let token = sessionStorage.getItem('token');
    if(token !== null) {
      var decodedToken = jwt_decode(token);
      var dateNow = new Date();
      if(decodedToken.exp * 1000 > dateNow.getTime()) {
        if((decodedToken.preferred_username === 'cccustomersupport') || (decodedToken.preferred_username === 'everyoneelse'))
          navigate('/auth/admin/home');
        else
        navigate('/auth/user/home');
      } else {
        console.log('continue...');
      }
    } else {
      console.log('continue...');
    }
    
  }, [navigate]);

  return(
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter Username"
              onChange={e => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            <a href="/userCreate">Register</a>
          </p>
        </div>
      </form>
    </div>
  )
}