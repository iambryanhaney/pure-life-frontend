import React from 'react'

import ListGroup from 'react-bootstrap/ListGroup'
import ControlledCarousel from '../components/ControlledCarousel'

const testimonies = [
    "Michael's one helluva Murse!",
    "He gave me a ride in a pedicab in '08 and in '20 he gave me chest compressions.",
    "Michael helped me go from beast mode to full on CYBORG mode!"
]
export default function Home() {
    return (
        <div >
            <ControlledCarousel />
            <div className="testimonies">
                <h4> Talk +Testify</h4>
                <ListGroup>
                    {
                        testimonies.map((t, i) => {
                            return <ListGroup.Item key={i}>"{t}"</ListGroup.Item>
                        })
                    }
                </ListGroup>
            </div>
        </div>
    )
}
