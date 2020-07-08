import React from 'react'

import Card from 'react-bootstrap/Card'
export default function About() {
    return (
        <div>
            <h1> Meet +About </h1>
            <Card style={{ width: '90%', margin: '10px auto' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                !!!!!!!!!ADD PROFILE PICTURE!!!!!!!!!
                <Card.Body>
                    <Card.Title>Michael Ray Wilson </Card.Title>
                    <Card.Text>
                        Michael's path as a holistic practitioner began when he moved to Austin, TX in 2007. At this time his commitment to help his community heal, grow, and flourish budded when he became a registered yoga teacher. Since then he has greatly expanded his therapeutic skill set, and also has the opportunity to work within his community as a registered nurse, a licensed massage therapist, and a certified reiki practitioner. He has applied these skills in varied settings including wellness centers, community centers, inpatient hospital settings, personal practice, volunteer activities, and in clients living spaces. Michael has experience with and not limited to engaging clients to help navigate chronic health conditions, pain and mobility issues, mental health needs, therapeutic communication and person centered goal setting, grieving, substance abuse, stress relief, and personal transformation. Being a natural people person, teacher, and leader, Michael helps to guide, nurture, and support  his clients to grow and achieve their highest goals. Blending compassion, dedication, integrity, honesty, hard work, lightheartedness, and patience helps him to co-create with and empower clients to find balance in all areas of their lives....................more about my style, philosophy, training, and skills.
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
