import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Timeslot from '../components/Timeslot'





const PROVIDER_URL = 'http://localhost:3001/providers'
const TIMESLOT_URL = 'http://localhost:3001/timeslots'


export default class Schedule extends Component {

    constructor() {
        super()
        this.state = {
            timeslots: []
        }
    }

    componentDidMount() {
        fetch(`${PROVIDER_URL}/1/schedule`)
        .then(resp => resp.json())
        .then(timeslots => this.setTimeslots(timeslots))
        .catch(err => console.error(err))
    }

    setTimeslots = (timeslots) => {
        this.setState({ timeslots: timeslots })
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

        // for (let day = 0; day <= 6; day++) {
        //     const ts = this.state.timeslots.find(ts => ts.day === day && ts.hour === hour)
        //     columns.push(
        //         <Timeslot timeslot={ts} clickTimeslot={this.clickTimeslot} />
        //     )
        // }

        const timeslots = this.state.timeslots.filter(ts => ts.hour === hour).sort((a,b) => a.id < b.id ? -1 : 1)
        timeslots.forEach(timeslot => columns.push(<Timeslot timeslot={timeslot} clickTimeslot={this.clickTimeslot} />))

        return columns
    }

    clickTimeslot = (timeslot) => {
        fetch(`${TIMESLOT_URL}/${timeslot.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ available: !timeslot.available })
        })
        .then(resp => resp.json())
        .then(timeslot => this.updateTimeslot(timeslot))
        .catch(err => console.error(err))
    }

    updateTimeslot = (timeslot) => {
        const updatedTimeslots = this.state.timeslots.map(ts => ts.id === timeslot.id ? timeslot : ts)
        this.setState({ timeslots: updatedTimeslots })
    }

    render() {
        return (
            <div>
                <h1 style={{ textAlign: 'center' }} >Schedule</h1>
                <h6 style={{ textAlign: 'center' }} >Click to set your standard, weekly availability.</h6>
                <Table striped bordered hover variant="dark" size="sm">
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center', width: '10%' }}>Time</th>
                            <th style={{ textAlign: 'center', width: '11.25%' }}>Sunday</th>
                            <th style={{ textAlign: 'center', width: '11.25%' }}>Monday</th>
                            <th style={{ textAlign: 'center', width: '11.25%' }}>Tuesday</th>
                            <th style={{ textAlign: 'center', width: '11.25%' }}>Wednesday</th>
                            <th style={{ textAlign: 'center', width: '11.25%' }}>Thursday</th>
                            <th style={{ textAlign: 'center', width: '11.25%' }}>Friday</th>
                            <th style={{ textAlign: 'center', width: '11.25%' }}>Saturday</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.timeslots.length > 0 ? this.buildTableRows() : null }
                    </tbody>
    
                </Table>
                {/* <h6 style={{textAlign:'center'}}>Financial Hardship Rates and Plan Discounts Available Upon Request </h6> */}
            </div>
        )
    }
}