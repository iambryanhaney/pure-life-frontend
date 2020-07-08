import React, { Component } from 'react';

import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Jumbotron from 'react-bootstrap/Jumbotron'

import ImageBannerHome from '../media/mountain-climbing.jpg'


export default class HomePage extends Component {

  render() {

    return (  
      <>
        <Image src={ImageBannerHome} fluid />
        <h1 className="text-center HomePage-h1">Pure Life Holistic Care and Lifestyle Coaching</h1>
        <p>Welcome to Pure Life blah blah...</p>
      </>
      );

  }
}