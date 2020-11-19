import React, { Component } from 'react';

//pages
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

//routes
import routes from '../routes';

//services
import api from '../services/api-services';
import photoUrl from '../services/photoURL';

//styles
import styles from './HomePage.module.css';

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

  setSearchQuery = searchQuery => {
    if (!searchQuery) {
      return;
    }

    this.props.history.push({
      ...this.props.location,
      search: `query=${searchQuery}`,
      pathname: `${routes.MOVIES}/`,
    });
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <SearchBar onSearch={this.setSearchQuery} />

        <div className={styles.titleAndListWrp}>
          <h1 className={styles.titleStyle}>Trending today</h1>

          <ul className={styles.listWrapper}>
            {this.state.movies.map(movie => (
              <li key={movie.id} className={styles.itemWrapper}>
                <Link
                  className={styles.linkStyle}
                  to={{
                    pathname: `${routes.MOVIES}/${movie.id}`,
                    state: { from: this.props.location },
                  }}
                >
                  <div className={styles.posterWrapper}>
                    <img
                      className={styles.imageStyle}
                      src={`${photoUrl.PHOTO}${movie.poster_path}`}
                      alt={movie.title}
                    />
                    {movie.vote_average > 7 ? (
                      <p className={styles.highRating}>{movie.vote_average}</p>
                    ) : (
                      <p className={styles.ratingStyle}>{movie.vote_average}</p>
                    )}
                    <p className={styles.filmName}>
                      {movie.title.slice(0, 30)}
                      {movie.title.length > 30 && '...'}
                    </p>
                    <div className={styles.releaseDate}>
                      {movie.release_date.slice(0, [4])}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default HomePage;
