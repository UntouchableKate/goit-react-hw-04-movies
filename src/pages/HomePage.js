import React, { Component } from 'react';

//pages
import { Link } from 'react-router-dom';

//routes
import routes from '../routes';

//services
import api from '../services/api-services';

class HomePage extends Component {
  state = {
    movies: [],
  };

  componentDidMount() {
    this.fetchTrending();
  }

  fetchTrending = () => {
    try {
      api.fetchTrendingMoviesToday().then(data => {
        this.setState({ movies: data.results });
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <h1>Trending today</h1>

        <ul>
          {this.state.movies.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `${routes.MOVIES}/${movie.id}`,
                  state: { from: this.props.location },
                }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default HomePage;
