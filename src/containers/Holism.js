import React from 'react'

import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import ListGroup from 'react-bootstrap/ListGroup'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


export default function Holism() {
    return (
        <div>
            <h1>Holism +Experiences</h1>
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="1">
                <Row>
                    <Col sm={4}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item >
                                <Nav.Link eventKey="1">Lifestyle Coaching</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="2">Yoga Planning</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="3">Message Therapy</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="4">Reiki Energy Balancing</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={8}>
                        <Tab.Content>
                            <Tab.Pane eventKey="1">
                                <ListGroup>
                                    <ListGroup.Item>Motivational Interviewing</ListGroup.Item>
                                    <ListGroup.Item>Detailed Assessment</ListGroup.Item>
                                    <ListGroup.Item>Identify goals in all areas of life</ListGroup.Item>
                                    <ListGroup.Item>Client based balanced plan of action</ListGroup.Item>
                                    <ListGroup.Item>Accountability and evaluation with follow-up</ListGroup.Item>
                                </ListGroup>
                            </Tab.Pane>
                            <Tab.Pane eventKey="2">
                                <ListGroup>
                                    <ListGroup.Item>Client based yoga programming </ListGroup.Item>
                                    <ListGroup.Item>Specific physical posture sequencing</ListGroup.Item>
                                    <ListGroup.Item>Yoga Nidra for deep relaxation, balance and stress relief</ListGroup.Item>
                                    <ListGroup.Item>Sankalpa/Resolve/Intention/State setting</ListGroup.Item>
                                    <ListGroup.Item>Meditation techniques</ListGroup.Item>
                                </ListGroup>
                            </Tab.Pane>
                            <Tab.Pane eventKey="3">
                                <ListGroup>
                                    <ListGroup.Item>Blend of Shiatsu, deep tissue, and Swedish massage techniques</ListGroup.Item>
                                    <ListGroup.Item>Table and chair services</ListGroup.Item>
                                    <ListGroup.Item>In home massage available for additional charge</ListGroup.Item>
                                </ListGroup>
                            </Tab.Pane>
                            <Tab.Pane eventKey="4">
                                <ListGroup>
                                    <ListGroup.Item>Grounding exercise</ListGroup.Item>
                                    <ListGroup.Item>Creation of deep calm and peace</ListGroup.Item>
                                    <ListGroup.Item>Opening, clearing, and balancing of energetic pathways</ListGroup.Item>
                                </ListGroup>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

        </div>
    )
}
