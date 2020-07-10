import React, { Component } from 'react'

export default class PatientAppointment extends Component {

    constructor() {
        super()
        this.state = {
            availableColor: '#21c40c',
            bookedColor: '#3d30c2',
        }
    }

    highlightTimeslot = (highlight) => {
        this.setState({ 
            availableColor: highlight ? '#06bfad' : '#21c40c',
            bookedColor: highlight ? '#7670ba' : '#3d30c2' })
    }



    renderSlot = () => {
        if (this.props.appointment) {
            console.log(`appt: ${typeof this.props.appointment.patient_id}  |  p_id: ${typeof this.props.patient_id}`)
            if (this.props.appointment.patient_id === Number(this.props.patient_id)) {
                return (
                    <td style={{ textAlign: 'center', backgroundColor: this.state.bookedColor }}
                        onClick={() => this.props.confirmDeleteAppointment(this.props.appointment)}
                        onMouseOver={() => this.highlightTimeslot(true)}
                        onMouseOut={() => this.highlightTimeslot(false)} >
                        Booked
                    </td> 
                )
            } else {
                return (
                    <td style={{ textAlign: 'center', backgroundColor: '#61533d' }}
                        onClick={() => this.props.updateShowToast(true)} >
                        Unavailable
                    </td>
                )
            }
            
        } else if (this.props.timeslot.available) {
            return (
                <td style={{ textAlign: 'center', backgroundColor: this.state.availableColor }}
                    onClick={
                        () => this.props.confirmCreateAppointment(
                            this.props.date.set('hour', this.props.timeslot.hour).format('YYYY-MM-DDTHH'))
                    } 
                    onMouseOver={() => this.highlightTimeslot(true)}
                    onMouseOut={() => this.highlightTimeslot(false)} >
                    Available
                </td> 
            )
        } else {
            return (
                <td style={{ textAlign: 'center' }} onClick={() => this.props.updateShowToast(true)}>
                </td>
            )
        }
    }

    render() {
        return ( this.renderSlot() )
    }   
}