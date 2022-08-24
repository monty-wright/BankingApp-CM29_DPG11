import React from 'react';
import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";

class Account extends React.Component{
  state = {
    expiredToken: ""
  };
  componentDidMount(){
    let token = sessionStorage.getItem("token");
    var parsedToken = JSON.parse(token);
    var decodedToken = jwt_decode(parsedToken.token);
    
    var dateNow = new Date();
    if(decodedToken.exp * 1000 < dateNow.getTime()) {
      console.log("token expired");
      //sessionStorage.removeItem("token");
      this.setState({'expiredToken': true})
    } else {
      console.log("token valid");
    }
  }
  render(){
    if (this.state.expiredToken){
      return <Navigate to="/" />
    }
    return (
      <h2>Account Details</h2>
    )
  }
}

export default Account;