import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import HomePage from './containers/HomePage'



function App() {

  const blah = () => {
    const arr = []
    for(let i = 0; i < 100; i++) {
      arr.push(<p>Hello! {i}</p>)
    }
    return arr
  }

  return (
    <Router>
      <Container >
        <Navbar expand="sm" bg="dark" variant="dark">
          <Container>
            <Nav>
              <Nav.Link href="">Home</Nav.Link>
              <Nav.Link href="">About</Nav.Link>
              <Nav.Link href="">Services</Nav.Link>
              <Nav.Link href="">Testimonials</Nav.Link>
              <Nav.Link href="">Pricing</Nav.Link>
              <Nav.Link href="">Blog</Nav.Link>
              <Nav.Link href="">Signup</Nav.Link>
              <Nav.Link href="">Client Login</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <HomePage />
        {/* {
          blah()
        } */}
      </Container>
    </Router>
  );
}

export default App;
