import React, { Component } from 'react';
import Slider from 'react-slick';
import { MajorCarouselItem } from '..';
import './MajorCarousel.css';
import MAJORS from '../MajorTypeahead/majors';

class MajorCarousel extends Component {
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    render() {
        this.shuffleArray(MAJORS);

        const settings = {
            autoplay: true,
            arrows: false,
            speed: 1000,
            autoplaySpeed: 1000,
            infinite: true,
            slidesToShow: 25,
            slidesToScroll: 1,
            vertical: true
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