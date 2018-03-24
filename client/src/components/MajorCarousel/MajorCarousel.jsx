import React, { Component } from 'react';
import Slider from 'react-slick';
import { MajorCarouselItem } from '..';
import './MajorCarousel.css';
import MAJORS from '../MajorTypeahead/majors';

class MajorCarousel extends Component {
    render() {
        const settings = {
            autoplay: true,
            speed: 1000,
            autoplaySpeed: 1000,
            infinite: true,
            slidesToShow: 25,
            slidesToScroll: 1,
            vertical: true,
            verticalSwiping: true
        };
        return (
            <div className="MajorCarousel">
                <Slider {...settings}>
                    {MAJORS.map((major, i) => <MajorCarouselItem key={i} major={major} />)}
                </Slider>
            </div >
        );
    }
}

export default MajorCarousel;