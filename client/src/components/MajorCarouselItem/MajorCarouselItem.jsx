import React, { Component } from 'react';
import './MajorCarouselItem.css';

class MajorCarouselItem extends Component {
    render() {
        const { major, ...props } = this.props
        return (
            <div {...props} className="MajorCarouselItem"><h3>{major}</h3></div>
        )
    }
}

export default MajorCarouselItem;