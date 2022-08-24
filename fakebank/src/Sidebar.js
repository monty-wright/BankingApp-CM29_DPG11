import React from 'react';
import { bubble as Menu } from 'react-burger-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCocktail, faDesktop, faHistory, faHome } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';
import { Link } from 'react-router-dom';

export default props => {
  return (
    <Menu>
      <Link className="menu-item" to="/">
        <FontAwesomeIcon icon={faHome} /> Home
      </Link>
      <hr />
      <Link className="menu-item" to="/createAccount">
        <FontAwesomeIcon icon={faCocktail} /> Create New Account
      </Link>
      <hr />
      <Link className="menu-item" to="/accountDetails">
        <FontAwesomeIcon icon={faDesktop} /> Account Details
      </Link>
      <hr />
      <Link className="menu-item" to="/statements">
        <FontAwesomeIcon icon={faHistory} /> Statements
      </Link>
      <hr />
    </Menu>
  );
};