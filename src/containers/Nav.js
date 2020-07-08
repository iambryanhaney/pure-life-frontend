import React from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export default function NavSite() {
    return (
        <Navbar fixed="top" bg="dark" variant="dark">
            <Nav className="mr-auto">
                <NavLink to="/" exact activeStyle={{ color: '#00FF00' }}>Home </NavLink>
                <NavLink to="/blog" activeStyle={{ color: '#00FF00' }}>Blog </NavLink>
                <NavLink to="/about" activeStyle={{ color: '#00FF00' }}>About </NavLink>
            </Nav>
        </Navbar>
    )
}
