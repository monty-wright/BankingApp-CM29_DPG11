import './App.css';
import Sidebar from './Sidebar';
import React from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import useToken from './useToken';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Statement from './components/Statement/Statement';
import Account from './components/Account/Account';
import CreateAccount from './components/Account/Create';
import jwt_decode from "jwt-decode";
import Fetch from './components/Account/Fetch';

function App() {

  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }
  
  var decodedToken = jwt_decode(token);
    
  var dateNow = new Date();
  if(decodedToken.exp * 1000 < dateNow.getTime()) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="App" id="outer-container">
      <div id="page-wrap">
        <BrowserRouter>
          <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/statements" element={<Statement />} />
            <Route path="/accountDetails" element={<Account />} />
            <Route path="/createAccount" element={<CreateAccount />} />
            <Route path="/fetch" element={<Fetch />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
