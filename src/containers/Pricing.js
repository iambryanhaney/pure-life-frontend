import React from 'react'

import Table from 'react-bootstrap/Table'
export default function Pricing() {
    return (
        <div>
            <h1>Pricing +Plans</h1>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Price Per Hour</th>
                        <th>Service</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>$45</td>
                        <td>Lifestyle Coaching</td>
                    </tr>
                    <tr>
                        <td>$45</td>
                        <td>Personal Yoga Program Planning</td>
                    </tr>
                    <tr>
                        <td>$60</td>
                        <td>Massage Therapy Services</td>
                    </tr>
                    <tr>
                        <td>$50</td>
                        <td>Reiki Energy Balancing</td>
                    </tr>
                </tbody>

            </Table>
            <h6 style={{textAlign:'center'}}>Financial Hardship Rates and Plan Discounts Available Upon Request </h6>
        </div>
    )
}

