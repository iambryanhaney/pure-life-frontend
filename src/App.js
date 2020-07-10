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
      role: null,
      patient_id: null,
      provider_id: null,
      first_name: '',
      last_name: '',
      redirect: null,
    }
  }

  componentWillMount() {
    if (window.localStorage.auth_token) {
      this.setState({
        loggedIn: true,
        is_admin: window.localStorage.is_admin === 'false' ? false : true,
        first_name: window.localStorage.first_name,
        last_name: window.localStorage.last_name,
        patient_id: window.localStorage.patient_id,
        provider_id: window.localStorage.provider_id,
        role: window.localStorage.role
      })
    }
  }

  logout = () => {
    delete window.localStorage.auth_token
    delete window.localStorage.is_admin
    delete window.localStorage.first_name
    delete window.localStorage.role
    window.location.reload()
    window.location.href = 'http://localhost:3000'
  }

  setUser = user => {
    this.setState({
      first_name: user.first_name,
      last_name: user.last_name,
      loggedIn: true,
      role: user.role,
      patient_id: user.patient_id,
      provider_id: user.provider_id,
      is_admin: user.is_admin,
      redirect: '/'
    })
  }
  render() {
    return (
      <Router>
        {
          this.state.loggedIn ?
            <p className="status" style={{ color: '#00ff00' }}>Logged in as {this.state.first_name}</p>
            :
            null
        }
        <NavSite loggedIn={this.state.loggedIn} logout={this.logout} first_name={this.state.first_name} role={this.state.role} />
        {this.state.redirect ? <Redirect to={this.state.redirect} /> : null}
        <Route path='/' exact render={() => <Home />} />
        <Container style={{ marginTop: '100px' }}>
          <Route path='/blog' exact render={() => <Blog is_admin={this.state.is_admin} />} />
          <Route path='/about' exact render={() => <About />} />
          <Route path='/holism' exact render={() => <Holism />} />
          <Route path='/pricing' exact render={() => <Pricing />} />
          <Route path='/schedule' exact render={() => <Schedule />} />
          <Route path='/patient-appointments' exact render={() => <PatientAppointments first_name={this.state.first_name} last_name={this.state.last_name} patient_id={this.state.patient_id} />} />
          <Route path='/provider-appointments' exact render={() => <ProviderAppointments provider_id={this.state.provider_id} />} />
          <Route path='/logout' exact render={() => this.logout} />
          <Route path='/signup' exact render={() => <Signup setUser={this.setUser} signupURL={signupURL} />} />
          <Route path='/login' exact render={() => <Login loginURL={userLoginURL} setUser={this.setUser} />} />
        </Container>
      </Router >
    )
  }
}

export default App;
