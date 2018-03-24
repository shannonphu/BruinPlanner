import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { Row, Col, Icon } from 'antd';
import { MajorCarousel } from '..';
import MAJORS from './majors';
import './MajorTypeahead.css';

function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Teach Autosuggest how to calculate suggestions for any given input value.
function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return MAJORS.filter(major => regex.test(major));
}

const getSuggestionValue = suggestion => suggestion;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>{suggestion}</div>
);

class MajorTypeahead extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            suggestions: []
        };
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'ie. economics, applied math, computer science, etc...',
            value,
            onChange: this.onChange
        };

        return (
            <Row type="flex" justify="center" className="typeahead-row">
                <Col sm={12} md={6}>
                    <p className="question">What is your major?</p>
                    <MajorCarousel />
                </Col>
                <Col sm={12} md={18}>
                    <Row className="searchbox">
                        <Col xs={3} sm={2} lg={1}><Icon type="search" className="icon" /></Col>
                        <Col xs={21} sm={22} lg={23}>
                            <Autosuggest
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                renderSuggestion={renderSuggestion}
                                getSuggestionValue={getSuggestionValue}
                                inputProps={inputProps}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default MajorTypeahead;