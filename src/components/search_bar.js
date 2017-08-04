import React, { Component } from 'react';
//{Component} is essentially the same as const Component = React.Component;

class SearchBar extends Component {//define a new class and give it all of the functionality that React.Component has
    constructor(props) {
        super(props);

        this.state = { term: '' };
    }

    render() {
        return ( // user enters text, update the state
            <div className="search-bar" >
                <input
                    placeholder="Search"
                    value={this.state.term}//receive it's value from state
                    onChange={event => this.onInputChange(event.target.value)} />
            </div>//whenever content of input changes, it call onInputchange with the new input value
        );
    }

    //sets the state of the component, and fires off callback function onSearchTermChange
    onInputChange(term) {
        this.setState({ term });
        this.props.onSearchTermChange(term);
    }

}//every react component that is class based must have a Render method

export default SearchBar;
