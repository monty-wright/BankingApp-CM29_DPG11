import React, { useState, useEffect } from 'react';
import './Login.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

async function loginUser(credentials) {
 console.log(credentials);
 return fetch('http://localhost:8080/api/fakebank/signin/', {
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
    
    /*const auth_response = await loginUser({
      username,
      password
    });
    setToken({"token":auth_response.jwt});*/    
    sessionStorage.setItem('token',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjZGNkMTMyYy1iZWQzLTRjMDQtYWEzMS03Zjk1MzkxMTMyNzYiLCJzdWIiOiJsb2NhbHwyNzIxZGM4MC02NjZjLTQ3NGQtYjNkNS00MDUxZDc0NjQ1MzEiLCJpc3MiOiJreWxvIiwiYWNjIjoia3lsbyIsInByZWZlcnJlZF91c2VybmFtZSI6ImNjYWNjb3VudG93bmVyIiwiY3VzdCI6eyJkb21haW5faWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJzaWQiOiIwZTY3ZDQ3NS0yMzEzLTQxNjEtOTc3MS01NWFhMTYyMWJlYWQiLCJ6b25lX2lkIjoiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwIn0sImp3dGlkIjoiYzQxNzIwZDctMjQ5My00MzJiLWE5N2UtN2VmNWIxMGI5NTc1IiwiaWF0IjoxNjY0OTAyMDY2LCJleHAiOjE2NjQ5MDIzNjZ9.-MG-NkC86V9eSo0K5Gs0ZtRdSIIk1itRBytgOlFyfHk");
    let token = sessionStorage.getItem('token');
    var decodedToken = jwt_decode(token);
    var dateNow = new Date();
    
    if(token!==null && !(decodedToken.exp * 1000 > dateNow.getTime())) {
      if(decodedToken.preferred_username === 'ccaccountowner')
        navigate('/auth/user/home');
      else if(decodedToken.preferred_username === 'cccustomersupport')
        navigate('/auth/admin/home');
      else
        navigate('/login');
    } else {
      console.log('continue...');
    }
  }

  useEffect(() => {
    let token = sessionStorage.getItem('token');
    if(token !== null) {      
      var decodedToken = jwt_decode(token);
      var dateNow = new Date();
      
      if(decodedToken.exp * 1000 > dateNow.getTime()) {
        if(decodedToken.preferred_username === 'ccaccountowner')
          navigate('/auth/user/home');
        else if(decodedToken.preferred_username === 'cccustomersupport')
          navigate('/auth/admin/home');
        else
          navigate('/login');
      } else {
        console.log('continue...');
      }
    } else {
      console.log('continue...');
    }
    
  }, []);

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
            Forgot password?
          </p>
        </div>
      </form>
    </div>
  )
}