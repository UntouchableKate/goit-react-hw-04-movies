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
    // fetch (
    //   'https://api.themoviedb.org/3/trending/movie/day?api_key=754954b74cd2707762208fc23a169e09'
    // )
    //   .then (res => res.json ())
    //   .then (data => {
    //     this.setState ({movies: data.results});
    //   });
    this.fetchTrending();
  }

  fetchTrending = () => {
    api.fetchTrendingMoviesToday().then(data => {
      this.setState({ movies: data.results });
    });
  };

  //{`${this.props.match.url}/${movie.id}`}
  //{`/movies/${movie.id}`}

  render() {
    // const { match } = this.props;
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
