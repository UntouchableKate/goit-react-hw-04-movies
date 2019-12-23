import React, { Component } from 'react';

class SearchBar extends Component {
  state = {
    value: '',
  };

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.onSearch(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" value={this.state.value} onChange={this.onChange} />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default SearchBar;
