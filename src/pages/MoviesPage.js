import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//component
import SearchBar from '../components/SearchBar';

//services
import api from '../services/api-services';

class MoviesPage extends Component {
  state = {
    movie: [],
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search).get('query');

    if (!query) {
      return;
    }

    api.fetchSearchMovie(query).then(movie => {
      this.setState({
        movie,
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = new URLSearchParams(prevProps.location.search).get(
      'query',
    );
    const nextQuery = new URLSearchParams(this.props.location.search).get(
      'query',
    );

    if (prevQuery === nextQuery) {
      return;
    }

    api.fetchSearchMovie(nextQuery).then(movie => {
      this.setState({
        movie,
      });
    });
  }

  setSearchQuery = searchQuery => {
    this.props.history.push({
      ...this.props.location,
      search: `query=${searchQuery}`,
    });
  };

  //   fetch(
  //     'https://api.themoviedb.org/3/search/movie?api_key=754954b74cd2707762208fc23a169e09&language=en-US&query=${query}&page=1',
  //   )
  //     .then(res => res.json())
  //     .then(data => {
  //       this.setState({ movies: data.results });
  //     });

  render() {
    const { match } = this.props;
    const { movie } = this.state;
    return (
      <div>
        <SearchBar onSearch={this.setSearchQuery} />
        <ul>
          {movie.map(elem => (
            <li key={elem.id}>
              <Link
                to={{
                  pathname: `${match.url}/${elem.id}`,
                  state: { from: this.props.location },
                }}
              >
                {elem.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default MoviesPage;