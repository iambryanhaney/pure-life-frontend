import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errors: undefined
        }
    }
    handleSubmit = e => {
        e.preventDefault()
        fetch(this.props.loginURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.user) {
                    window.localStorage.auth_token = json.auth_token
                    window.localStorage.is_admin = json.user.is_admin
                    this.props.setUser(json.user)
                } else {
                    this.setState({ errors: json.errors })
                }

            })
    }
    handleOnChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    renderErrors = () => {
        return (
            <Alert variant="danger">{this.state.errors}</Alert>
        )
    }
    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} required onChange={this.handleOnChange} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" required value={this.state.password} onChange={this.handleOnChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                {
                    this.state.errors ? this.renderErrors() : null
                }
            </div>
        )
    }
}
