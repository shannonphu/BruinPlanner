import React, { Component } from 'react';
import Slider from 'react-slick';
import './MajorCarousel.css';
import MAJORS from '../MajorTypeahead/majors';

class CustomSlide extends Component {
    render() {
        const { major, ...props } = this.props
        return (
            <div {...props}><h3>{major}</h3></div>
        )
    }
}

class MajorCarousel extends Component {
    render() {
        const settings = {
            autoplay: true,
            speed: 1000,
            autoplaySpeed: 1000,
            infinite: true,
            slidesToShow: 14,
            slidesToScroll: 1,
            vertical: true,
            verticalSwiping: true
        };
        return (
            <div className="MajorCarousel">
                <Slider {...settings}>
                    {MAJORS.map((major, i) => <CustomSlide key={i} major={major} />)}
                </Slider>
            </div >
        );
    }
}

export default MajorCarousel;