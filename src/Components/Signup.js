import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import Alert from 'react-bootstrap/Alert'
export default class Signup extends Component {

    constructor(props) {
        super(props)

        this.state = {
            validated: false,
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            password_confirmation: '',
            errors: undefined
        }
    }
    handleSubmit = e => {
        e.preventDefault()
        e.stopPropagation()
        if (e.currentTarget.checkValidity()) {
            const { email, first_name, last_name, password, password_confirmation } = this.state
            fetch(this.props.signupURL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    first_name,
                    last_name,
                    password,
                    password_confirmation
                })
            })
                .then(res => res.json())
                .then(json => {
                    if (json.user) {
                        window.localStorage.auth_token = json.auth_token
                        this.props.setUser(json.user)
                    } else {
                        this.setState({
                            errors: json.errors
                        })

                    }
                })
        }
        this.setState({ validated: true })
    }

    handleOnChange = e => {
        this.setState({
            [e.target.name]: e.target.value.trim()
        })
    }
    renderErrors() {
        const keys = Object.keys(this.state.errors)
        return keys.map((key, idx) => {
            return <Alert key={idx} variant="danger"> {`${key} ${this.state.errors[key][0]}`}</Alert>
        })

    }
    render() {
        return (
            <div>
                <h1> Signup </h1>

                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit} >
                    <Form.Row>
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="First name"
                                name="first_name"
                                value={this.state.first_name}
                                onChange={this.handleOnChange}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Last name"
                                value={this.state.last_name}
                                name="last_name"
                                onChange={this.handleOnChange}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustomEmail">
                            <Form.Label>Email</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    required
                                    name="email"
                                    autoComplete="email"
                                    value={this.state.email}
                                    onChange={this.handleOnChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid email.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="4" controlId="validationCustom03">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                required
                                minLength="8"
                                autoComplete="new-password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleOnChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a password.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom04">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="password"
                                pattern={this.state.password}
                                required
                                name="password_confirmation"
                                value={this.state.password_confirmation}
                                autoComplete="new-password"
                                onChange={this.handleOnChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Passwords must match.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Button type="submit">Signup</Button>
                </Form>
                {
                    this.state.errors ? this.renderErrors() : null
                }
            </div>
        )
    }
}