import React, { Component } from 'react'
import moment from 'moment'

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'


import PatientAppointment from '../components/PatientAppointment'
import CreateAppointmentModal from '../components/CreateAppointmentModal'
import DeleteAppointmentModal from '../components/DeleteAppointmentModal'


const PROVIDER_URL = 'http://localhost:3001/providers'
const PATIENT_URL = 'http://localhost:3001/patients'
const APPOINTMENT_URL = 'http://localhost:3001/appointments'



export default class PatientAppointments extends Component {

    constructor() {
        super()
        
        const today = moment().day()
        const dates = []
        for (let i = 0; i < 7; i++) {
            dates.push( moment().subtract(today, 'days').add(i, 'days') )
        }

        this.state = {
            today: today,
            dates: dates,
            appointments: [],
            timeslots: [],
            showToast: false,
            showCreateModal: false,
            createAppointmentDate: null,
            showDeleteModal: false,
            deleteAppointmentObject: null,
        }
    }

    componentDidMount() {
        fetch(`${PROVIDER_URL}/1/schedule`)
        .then(resp => resp.json())
        .then(timeslots => this.setTimeslots(timeslots))
        .catch(err => console.error(err))

        fetch(`${PATIENT_URL}/1/appointments`)
        .then(resp => resp.json())
        .then(appointments => this.setAppointments(appointments))
        .catch(err => console.error(err))
    }

    setTimeslots = (timeslots) => {
        this.setState({ timeslots: timeslots })
     }

    setAppointments = (appointments) => {
        this.setState({ appointments: appointments })
    }

    confirmCreateAppointment = (date) => {
        this.setState({ showCreateModal: true, createAppointmentDate: date })
    }

    createAppointment = (date) => {
        fetch(APPOINTMENT_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ patient_id: 1, provider_id: 1, date: date})
        })
        .then(resp => resp.json())
        .then(appointment => this.updateAppointmentsWithCreated(appointment))
        .catch(err => console.error(err))
    }

    confirmDeleteAppointment = (appointment) => {
        this.setState({ showDeleteModal: true, deleteAppointmentObject: appointment })
    }

    deleteAppointment = (appointment) => {
        fetch(`${APPOINTMENT_URL}/${appointment.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({})
        })
        .then(resp => resp.json())
        .then(appointment => this.updateAppointmentsWithDeleted(appointment))
        .catch(err => console.error(err))
    }

    updateAppointmentsWithCreated = (appointment) => {
        this.setState({
            appointments: [...this.state.appointments, appointment],
            showCreateModal: false,
            createAppointmentDate: null,
        })
    }

    updateAppointmentsWithDeleted = (appointment) => {
        this.setState({ 
            appointments: this.state.appointments.filter(appt => appt.id !== appointment.id),
            showDeleteModal: false,
            deleteAppointmentObject: null,
         })
    }

    buildTableRows = () => {
        const table = []
        for (let hour = 6; hour <= 22; hour++) {
            table.push(
                <tr>
                    <td style={{ textAlign: 'right' }}>
                        { hour <= 12 ? hour : hour-12 }:00 { hour < 12 ? 'AM\xa0\xa0' : 'PM\xa0\xa0' }
                    </td>
                    { this.buildTableColumns(hour) }
                </tr>
            )
        }
        return table
    }

    buildTableColumns = (hour) => {
        const columns = []
        for (let day = 0; day <= 6; day++) {
            let slotDate = moment(this.state.dates[day]).set('hour', hour).format('YYYY-MM-DDTHH')
            columns.push(
                <PatientAppointment date={this.state.dates[day]} 
                    timeslot={this.state.timeslots.find(ts => ts.day === day && ts.hour === hour)}
                    appointment={this.state.appointments.find(appt => appt.date === slotDate) }
                    updateShowToast={this.updateShowToast} 
                    confirmCreateAppointment={this.confirmCreateAppointment} 
                    confirmDeleteAppointment={this.confirmDeleteAppointment} />
            )
        }
        return columns
    }

    getDayHeader = (day) => {
        return this.state.dates[day].format('M/DD/YYYY')
    }

    updateWeek = (numberOfWeeks) => {
        const newDates = this.state.dates.map(date => date.add(numberOfWeeks, 'weeks'))
        this.setState({ dates: newDates })
    }

    updateShowToast = (visible) => {
        this.setState({ showToast: visible })
    }

    closeCreateModal = () => {
        this.setState({ showCreateModal: false, createAppointmentDate: null })
    }

    closeDeleteModal = () => {
        this.setState({ showDeleteModal: false, deleteAppointmentObject: null })
    }

    render() {
        return (
            <div>
                <h1 style={{ textAlign: 'center'}}>Appointments</h1>
                <h6 style={{ textAlign: 'center'}}>Click to reserve or edit your appointment times.</h6>
                <Button variant="info" onClick={() => this.updateWeek(-1)}>&lt;</Button>
                <span> Week </span>
                <Button variant="info" onClick={() => this.updateWeek(1)}>&gt;</Button>
                <Toast style={{
                        position: 'absolute',
                        top: 100,
                        right: 50,
                        backgroundColor: '#d46666',
                }} autohide={true} delay={1500} show={this.state.showToast} onClose={() => this.updateShowToast(false)} > 
                    <Toast.Body>Please select an available time slot.</Toast.Body>
                </Toast>
                <Table striped bordered hover variant="dark" size="sm">
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center', width: '10%' }}>Time</th>
                            <th style={{ textAlign: 'center', width: '11.25%' }}>{ this.getDayHeader(0) }<br />Sunday</th>
                            <th style={{ textAlign: 'center', width: '11.25%' }}>{ this.getDayHeader(1) }<br />Monday</th>
                            <th style={{ textAlign: 'center', width: '11.25%' }}>{ this.getDayHeader(2) }<br />Tuesday</th>
                            <th style={{ textAlign: 'center', width: '11.25%' }}>{ this.getDayHeader(3) }<br />Wednesday</th>
                            <th style={{ textAlign: 'center', width: '11.25%' }}>{ this.getDayHeader(4) }<br />Thursday</th>
                            <th style={{ textAlign: 'center', width: '11.25%' }}>{ this.getDayHeader(5) }<br />Friday</th>
                            <th style={{ textAlign: 'center', width: '11.25%' }}>{ this.getDayHeader(6) }<br />Saturday</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.timeslots.length > 0 ? this.buildTableRows() : null }
                    </tbody>
    
                </Table>
                <CreateAppointmentModal date={this.state.createAppointmentDate} showCreateModal={this.state.showCreateModal} createAppointment={this.createAppointment}
                    closeCreateModal={this.closeCreateModal} />
                <DeleteAppointmentModal appointment={this.state.deleteAppointmentObject} showDeleteModal={this.state.showDeleteModal} 
                    deleteAppointment={this.deleteAppointment} closeDeleteModal={this.closeDeleteModal} />
                {/* <h6 style={{textAlign:'center'}}>Financial Hardship Rates and Plan Discounts Available Upon Request </h6> */}
            </div>
        )
    }
}