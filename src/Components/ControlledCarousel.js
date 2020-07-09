import React, { useState } from 'react'

import Carousel from 'react-bootstrap/Carousel'

import Hiking from '../assets/media/hiking.jpg'
import Zen1 from '../assets/media/zen1.jpg'
import Zen2 from '../assets/media/zen2.jpg'
export default function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} style={{ width: '100%' }}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={Hiking}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>PureLife</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={Zen1}
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h3>Holism</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={Zen2}
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>Lifestyle</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}
