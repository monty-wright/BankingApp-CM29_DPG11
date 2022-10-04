import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import "bootstrap/dist/css/bootstrap.min.css"

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

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    
    /*const auth_response = await loginUser({
      username,
      password
    });
    setToken({"token":auth_response.jwt});*/
    
    setToken({"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjZGNkMTMyYy1iZWQzLTRjMDQtYWEzMS03Zjk1MzkxMTMyNzYiLCJzdWIiOiJsb2NhbHw2MjViZGYxMi1kNjBjLTRjZjUtOThhNy1iYjlhMGE1ZDNmNTIiLCJpc3MiOiJreWxvIiwiYWNjIjoia3lsbyIsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIiwiY3VzdCI6eyJkb21haW5faWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJncm91cHMiOlsiYWRtaW4iXSwic2lkIjoiYjU2Njc3M2EtOGM2YS00Nzk2LTkzNWItNjA5MTllZThkZDI0Iiwiem9uZV9pZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCJ9LCJqd3RpZCI6IjZlYzI2MjU1LWMzMTItNDM3Zi1iMzgzLTQzNmNiZDhkMmE5MCIsImlhdCI6MTY2NDg4OTUyNiwiZXhwIjoxNjY0ODg5ODI2fQ.SAU9v182cpfHBz4j8YViLi7cP4ddgFtnGvKAFQ3rJJ8"});
  }

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

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};