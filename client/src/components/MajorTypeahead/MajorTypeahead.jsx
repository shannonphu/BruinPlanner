import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import './MajorTypeahead.css';
import { Row, Col, Icon } from 'antd';

const majors = [
    {
        name: 'Computer Science'
    },
    {
        name: 'Electrical Engineering'
    },
    {
        name: 'Math'
    }
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : majors.filter(lang =>
        lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>{suggestion.name}</div>
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
            <Row type="flex" justify="center" align="middle" className="typeahead-row">
                <Col xs={6} className="question">
                    <p>What is your major?</p>
                </Col>
                <Col xs={18}>
                    <Col xs={1}><Icon type="search" className="icon" /></Col>
                    <Col xs={23}>
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        // renderInputComponent={renderInputComponent}
                        inputProps={inputProps}
                    />
                    </Col>
                </Col>
            </Row>
        );
    }
}

export default MajorTypeahead;