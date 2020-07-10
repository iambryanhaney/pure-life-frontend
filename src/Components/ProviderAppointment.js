import React, { Component } from 'react'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import moment from 'moment'

const PATIENT_URL = 'http://localhost:3001/patients'

export default class ProviderAppointment extends Component {

    constructor() {
        super()
        this.state = {
            availableColor: '#21c40c',
            bookedColor: '#3d30c2',
            patientName: '',
        }
    }

    fetchPatientName = () => {
        fetch(`${PATIENT_URL}/${this.props.appointment.patient_id}`)
        .then(resp => resp.json())
        .then(patient => this.setState({ patientName: `${patient.first_name} ${patient.last_name}` }))
        .catch(err => console.error(err))
    }
        
    highlightTimeslot = (highlight) => {
        this.setState({ 
            availableColor: highlight ? '#06bfad' : '#21c40c',
            bookedColor: highlight ? '#7670ba' : '#3d30c2' })
    }

    renderTooltip = (props) => {
        return (
          <Tooltip id="button-tooltip" {...props} >
                { this.state.patientName } <br />
                { moment(this.props.appointment.date).format('dddd, MMMM Do YYYY [at] h:mm A') }
          </Tooltip>
        );
    }

    renderSlot = () => {
        if (this.props.appointment) {
            if (!this.state.patientName) {
                this.fetchPatientName()
            }
            return (
                <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={this.renderTooltip} >
                    <td style={{ textAlign: 'center', backgroundColor: this.state.bookedColor }} >
                        Booked
                    </td> 
                </OverlayTrigger>
            )
        } else if (this.props.timeslot.available) {
            return (
                <td style={{ textAlign: 'center', backgroundColor: this.state.availableColor }}
                    onClick={() => {}}
                    onMouseOver={() => this.highlightTimeslot(true)}
                    onMouseOut={() => this.highlightTimeslot(false)} >
                    Available
                </td> 
            )
        } else {
            return (
                <td>
                </td>
            )
        }
    }

    render() {
        return ( this.renderSlot() )
    }   
}