import React from 'react'




export default function Timeslot(props) {
    const { day, hour, available } = props.timeslot

    return (
        <>
        { available ?
            <td style={{ textAlign: 'center', backgroundColor: '#21c40c' }}
                onClick={() => props.clickTimeslot(props.timeslot)}>
            Available 
            </td> 
            :
            <td style={{ textAlign: 'center' }} onClick={() => props.clickTimeslot(props.timeslot)}>
            </td>
        }
        </>
    )
}