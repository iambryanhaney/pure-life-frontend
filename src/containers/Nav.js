import React from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export default function NavSite(props) {
    return (
        <Navbar fixed="top" bg="dark" variant="dark">
            <Nav className="mr-auto">
                <NavLink to="/" exact activeStyle={{ color: '#00FF00' }}>Home </NavLink>
                <NavLink to="/blog" activeStyle={{ color: '#00FF00' }}>Blog </NavLink>
                <NavLink to="/about" activeStyle={{ color: '#00FF00' }}>About </NavLink>
                <NavLink to="/holism" activeStyle={{ color: '#00FF00' }}>Holism </NavLink>
                <NavLink to="/pricing" activeStyle={{ color: '#00FF00' }}>Pricing </NavLink>
            </Nav>
            <Nav className="mr-auto">
                {
                    props.loggedIn ?
                        <NavLink to="/logout" activeStyle={{ color: '#00FF00' }} onClick={props.logout}>Logout </NavLink>
                        :
                        <>
                            <NavLink to="/login" activeStyle={{ color: '#00FF00' }}>Login </NavLink>
                            <NavLink to="/signup" activeStyle={{ color: '#00FF00' }}>Signup </NavLink>
                        </>
                }

            </Nav>
        </Navbar>
    )
}
