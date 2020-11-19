import React, { Component } from 'react';

//styles
import styles from './SearchBar.module.css';

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
      <form onSubmit={this.onSubmit} className={styles.searchFormWrapper}>
        <div className={styles.buttonInInput}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.onChange}
            placeholder="Enter your request"
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            <span className="material-icons">search</span>
          </button>
        </div>
      </form>
    );
  }
}

export default SearchBar;
