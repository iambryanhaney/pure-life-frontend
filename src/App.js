import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Import Bootstrap
import Container from 'react-bootstrap/Container'

// Import custom Components
import NavSite from './containers/Nav'
import About from './containers/About'
import Blog from './containers/Blog'
import Home from './containers/Home'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false
    }
  }
  render() {
    return (
      <Router>
        <NavSite />
        <Route path='/' exact render={() => <Home />} />
        <Container style={{ marginTop: '100px' }}>
          <Route path='/blog' exact render={() => <Blog is_admin={true} />} />
          <Route path='/about' exact render={() => <About />} />
        </Container>
      </Router >
    )
  }
}

export default App;
