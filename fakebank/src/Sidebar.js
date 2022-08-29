import React from 'react';
import { faShield, faRectangleXmark, faHistory, faUser, faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Sidebar = () =>  {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">FakeBank</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/statements"><FontAwesomeIcon icon={faHistory} /> Transactions</Nav.Link>
            <NavDropdown title="Account" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/accountDetails">
                <FontAwesomeIcon icon={faBook} /> View Accounts
              </NavDropdown.Item>
              <NavDropdown.Item href="/createAccount">
                <FontAwesomeIcon icon={faShield} /> Create New Account
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">
                <FontAwesomeIcon icon={faRectangleXmark} /> Close Account
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>            
            <NavDropdown title="Profile" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/">
                <FontAwesomeIcon icon={faUser} /> Logout
              </NavDropdown.Item>              
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Sidebar;