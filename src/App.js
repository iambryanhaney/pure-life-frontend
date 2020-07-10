import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

// Import Bootstrap
import Container from 'react-bootstrap/Container'

// Import custom Components
import NavSite from './containers/Nav'
import About from './containers/About'
import Blog from './containers/Blog'
import Home from './containers/Home'
import Holism from './containers/Holism'
import Pricing from './containers/Pricing'
import Schedule from './containers/Schedule'
import PatientAppointments from './containers/PatientAppointments'
import ProviderAppointments from './containers/ProviderAppointments'
import Login from './components/Login'
import Signup from './components/Signup'

const signupURL = 'http://localhost:3001/signup'
const userLoginURL = 'http://localhost:3001/auth/login'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      is_admin: false,
      first_name: '',
      redirect: null
    }
  }

  componentDidMount() {
    if (window.localStorage.auth_token) {
      this.setState({
        loggedIn: true,
        is_admin: window.localStorage.is_admin === 'false' ? false : true,
        first_name: window.localStorage.first_name,
      })
    }
  }

  logout = () => {
    delete window.localStorage.auth_token
    delete window.localStorage.is_admin
    delete window.localStorage.first_name
    window.location.reload()
  }
  setUser = user => {
    this.setState({
      first_name: user.first_name,
      loggedIn: true,
      is_admin: user.is_admin,
      redirect: '/'
    })
  }
  render() {
    return (
      <Router>
        <p className="status" style={{ color: '#00ff00' }}>Logged in as {this.state.first_name}</p>
        <NavSite loggedIn={this.state.loggedIn} logout={this.logout} first_name={this.state.first_name} />
        {this.state.redirect ? <Redirect to={this.state.redirect} /> : null}
        <Route path='/' exact render={() => <Home />} />
        <Container style={{ marginTop: '100px' }}>
          <Route path='/blog' exact render={() => <Blog is_admin={this.state.is_admin} />} />
          <Route path='/about' exact render={() => <About />} />
          <Route path='/holism' exact render={() => <Holism />} />
          <Route path='/pricing' exact render={() => <Pricing />} />
          <Route path='/schedule' exact render={() => <Schedule />} />
          <Route path='/patient-appointments' exact render={() => <PatientAppointments />} />
          <Route path='/provider-appointments' exact render={() => <ProviderAppointments />} />
          <Route path='/logout' exact render={() => this.logout} />
          <Route path='/signup' exact render={() => <Signup setUser={this.setUser} signupURL={signupURL} />} />
          <Route path='/login' exact render={() => <Login loginURL={userLoginURL} setUser={this.setUser} />} />
        </Container>
      </Router >
    )
  }
}

export default App;
