import React, { Component } from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import moment from 'moment'

export default class DeleteAppointmentModal extends Component {

  parseDate = () => {
    if (this.props.appointment) {
      return (
        <> 
        <strong>
          { moment(this.props.appointment.date).format('dddd, MMMM Do YYYY [at] h:mm A')}
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
          show={this.props.showDeleteModal}
          onHide={() => this.props.closeDeleteModal()}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Cancel Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to cancel your appointment with Michael on {this.parseDate()}? 
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.props.closeDeleteModal()}>
              Go Back
            </Button>
            <Button variant="danger" onClick={() => this.props.deleteAppointment(this.props.appointment)}>Cancel Appointment</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}