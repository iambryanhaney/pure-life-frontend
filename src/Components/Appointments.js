import React, { Component } from 'react'

import { NavLink } from 'react-router-dom'

const apptURL = "http://localhost:3001/appointments/"
export default class Appointments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            appointments: []
        }
    }

    renderAppointments() {
        fetch(apptURL, {
            method: 'GET',
            headers: {
                'Authorization': window.localStorage.auth_token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => console.log(json))
    }
    render() {
        return (
            <div>
                <h1> Appointments </h1>

                {
                    this.props.loggedIn ?
                        this.renderAppointments()
                        :
                        <h2 style={{ fontSize: '44px', textAlign: 'center' }}><NavLink to="/login" activeStyle={{ color: '#00FF00' }}>Please Login</NavLink></h2>

                }
            </div>
        )
    }
}
