import React from 'react'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'
export default function Post(props) {
    const { title, content, created_at, id } = props.post

    return (

        <Accordion defaultActiveKey="1" style={{ marginTop: '5px', padding: '5px' }}>
            <Card style={{ borderColor: '#00FF00' }}>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <Card.Title> {title} </Card.Title>
                        <Card.Subtitle className="text-muted text-right">
                            <small>{created_at.split('T')[0]}</small>
                        </Card.Subtitle>
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Card.Text dangerouslySetInnerHTML={{__html: content}} />
                        {
                            props.is_admin ?
                                <>
                                    <Button variant="primary" onClick={() => props.editPost(id)}>Edit</Button>
                                    <Button variant="danger" onClick={() => props.deletePost(id)}>Delete</Button>
                                </>
                                :
                                null
                        }
                    </Card.Body>

                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}




{/* <div dangerouslySetInnerHTML={ {__html: content}} /> */ }

