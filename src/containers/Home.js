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
            <p className='indented-welcome'>
                At Pure Life Holistic Care and Coaching we are here to support, guide, and equip you to build the foundations of a balanced and healthy lifestyle.
                Your well being and transformation are within your reach. Sometimes you just need a hand.
                Here you will find skills, tools, and that helping hand to take the next step of your best life.  
                If you want to take that step together, please leave your contact information for a free consultation. 
            </p>
            <div className="testimonies">
                <h4> Talk + Testify</h4>
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
