import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { Redirect } from 'react-router-dom';
import MAJORS from './majors';
import './MajorTypeahead.css';

class MajorTypeahead extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            suggestions: [],
            selectedMajor: null
        };
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    escapeRegexCharacters(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Teach Autosuggest how to calculate suggestions for any given input value.
    getSuggestions(value) {
        const escapedValue = this.escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }

        const regex = new RegExp('^' + escapedValue, 'i');

        return MAJORS.filter(major => regex.test(major));
    }

    getSuggestionValue = suggestion => suggestion;

    // Use your imagination to render suggestions.
    renderSuggestion = suggestion => (
        <div>{suggestion}</div>
    );

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionSelected = (event, { suggestionValue }) => {
        this.setState({ selectedMajor: suggestionValue });
    }

    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'ie. economics, applied math, computer science, etc...',
            value,
            onChange: this.onChange
        };

        return this.state.selectedMajor ?
            <Redirect to={{ pathname: `/${this.state.selectedMajor.toLowerCase()}` }} />
            :
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                renderSuggestion={this.renderSuggestion}
                getSuggestionValue={this.getSuggestionValue}
                onSuggestionSelected={this.onSuggestionSelected}
                inputProps={inputProps}
            />
    }
}

export default MajorTypeahead;