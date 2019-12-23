import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

//routes
import routes from '../../routes';

//services
import api from '../../services/api-services';
import photoUrl from '../../services/photoURL';

//pages
import Cast from '../Cast/Cast';
import Reviews from '../Reviews';

//styles
import styles from './MovieDetails.module.css';

class MovieDetails extends Component {
  state = {
    movies: null,
  };

  componentDidMount() {
    this.fetchDetails();
  }

  fetchDetails = () => {
    const movieId = this.props.match.params.movieId;

    api.fetchMovieDetails(movieId).then(movie => {
      this.setState({ movie });
    });
  };

  goBack = () => {
    if (this.props.location.state && this.props.location.state.from) {
      this.props.history.push(this.props.location.state.from);
      return;
    }

    this.props.history.push('/');
  };

  render() {
    const { movie } = this.state;
    const { match } = this.props;
    return (
      <div>
        <button
          type="button"
          onClick={this.goBack}
          className={styles.buttonGoBack}
        >
          Go back
        </button>
        {movie && (
          <div className={styles.wrapper}>
            <img
              className={styles.imgWrapper}
              src={`${photoUrl.PHOTO}${movie.poster_path}`}
              alt={movie.title}
            ></img>
            <div className={styles.informationWrapper}>
              <h2>
                {movie.title} ({movie.release_date.slice(0, [4])})
              </h2>
              <p>User Score: {movie.vote_average * 10}%</p>
              <h3>Overview </h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <p className={styles.genres}>
                {movie.genres.map(genres => (
                  <li key={genres.id} className={styles.liGenres}>
                    {genres.name}
                  </li>
                ))}
              </p>
            </div>
          </div>
        )}

        <div className={styles.shadow}>
          <h4>Additional information</h4>
          <ul>
            <li>
              <Link
                to={{
                  pathname: `${match.url}/cast`,
                  state: { from: this.props.location },
                }}
                // to={`${match.url}/cast`}
              >
                Cast
              </Link>
            </li>
            <li>
              <Link
                to={{
                  pathname: `${match.url}/reviews`,
                  state: { from: this.props.location },
                }}
              >
                Raviews
              </Link>
            </li>
          </ul>
          <Switch>
            <Route path={routes.CAST} component={Cast} />
            <Route path={routes.REVIEWS} component={Reviews}></Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default MovieDetails;
