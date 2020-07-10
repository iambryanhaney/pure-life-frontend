import React, { Component } from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import moment from 'moment'

export default class CreateAppointmentModal extends Component {

  parseDate = () => {
    if (this.props.date) {
      return (
        <> 
        <strong>
          { moment(this.props.date).format('dddd, MMMM Do YYYY [at] h:mm A')}
        </strong>
        </>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <>
        <Modal
          show={this.props.showCreateModal}
          onHide={() => this.props.closeCreateModal()}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Appointment Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Would you like to reserve an appointment with Michael on {this.parseDate()}? 
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => this.props.closeCreateModal()}>
              Cancel
            </Button>
            <Button variant="success" onClick={() => this.props.createAppointment(this.props.date)}>Continue and pay</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}