import React, { Component } from 'react'
import moment from 'moment'

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import ProviderAppointment from '../components/ProviderAppointment'

const PROVIDER_URL = 'http://localhost:3001/providers'


export default class ProviderAppointments extends Component {

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
        }
    }

    componentDidMount() {
        fetch(`${PROVIDER_URL}/1/schedule`)
        .then(resp => resp.json())
        .then(timeslots => this.setTimeslots(timeslots))
        .catch(err => console.error(err))

        fetch(`${PROVIDER_URL}/1/appointments`)
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
                <ProviderAppointment date={this.state.dates[day]} 
                    timeslot={this.state.timeslots.find(ts => ts.day === day && ts.hour === hour)}
                    appointment={this.state.appointments.find(appt => appt.date === slotDate) } />
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

    render() {
        return (
            <div>
                <h1 style={{ textAlign: 'center'}}>Appointments</h1>
                <h6 style={{ textAlign: 'center'}}>Hover over appointments to see patient info.</h6>
                <Button variant="info" onClick={() => this.updateWeek(-1)}>&lt;</Button>
                <span> Week </span>
                <Button variant="info" onClick={() => this.updateWeek(1)}>&gt;</Button>
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
            </div>
        )
    }
}