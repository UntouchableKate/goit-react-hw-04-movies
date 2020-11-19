import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

//routes
import routes from '../../routes';

//services
import api from '../../services/api-services';
import photoUrl from '../../services/photoURL';
import trailerUrl from '../../services/trailerUrl';

//pages
import Cast from '../Cast/Cast';
import Reviews from '../Reviews';

//styles
import styles from './MovieDetails.module.css';

class MovieDetails extends Component {
  static defaultProps = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        movieId: PropTypes.string,
      }),
      location: PropTypes.shape({
        state: PropTypes.objectOf(
          PropTypes.shape({
            hash: PropTypes.string,

            search: PropTypes.string,
          }),
        ),
      }),
      history: PropTypes.shape({
        push: PropTypes.string,
      }),
    }),
  };

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        movieId: PropTypes.string,
      }),
      location: PropTypes.shape({
        state: PropTypes.objectOf(
          PropTypes.shape({
            hash: PropTypes.string,
            key: PropTypes.string.isRequired,
            pathname: PropTypes.string.isRequired,
            search: PropTypes.string,
          }),
        ),
      }),
      history: PropTypes.shape({
        push: PropTypes.string,
      }),
    }),
  };

  state = {
    movies: null,
    trailer: null,
  };

  componentDidMount() {
    this.fetchDetails();
    this.fetchTrailer();
  }

  fetchDetails = () => {
    const movieId = this.props.match.params.movieId;

    api.fetchMovieDetails(movieId).then(movie => {
      this.setState({ movie });
    });
  };

  fetchTrailer = () => {
    const movieId = this.props.match.params.movieId;
    api.fetchMovieTrailer(movieId).then(trailer => {
      this.setState({ trailer });
    });
  };

  goBack = () => {
    if (this.props.location.state && this.props.location.state.from) {
      this.props.history.push(this.props.location.state.from);

      return;
    }

    this.props.history.push(routes.HOME);
  };

  render() {
    const { movie, trailer } = this.state;
    const { match } = this.props;
    return (
      <div>
        <button
          type="button"
          onClick={this.goBack}
          className={styles.buttonGoBack}
        >
          <span className="material-icons">arrow_back_ios</span>
        </button>

        {movie && (
          <div className={styles.wrapper}>
            <img
              className={styles.imgWrapper}
              src={`${photoUrl.PHOTO}${movie.poster_path}`}
              alt={movie.title}
            />
            <div className={styles.informationWrapper}>
              <div className={styles.titleWrapper}>
                <h2 className={styles.maintTitle}>{movie.title}</h2>
                <p className={styles.realeaseDate}>
                  {movie.release_date.slice(0, [4])}
                </p>
              </div>
              <div className={styles.ratingWrapper}>
                <p className={styles.ratingStyles}>{movie.vote_average}</p>
                <span className="material-icons">star_half</span>
              </div>
              <h3 className={styles.titleAll}>Overview </h3>
              <p className={styles.text}>{movie.overview}</p>
              <div>
                <h3 className={styles.titleAll}>Genres</h3>
                <p className={styles.genres}>
                  {movie.genres.map(genres => (
                    <li key={genres.id} className={styles.liGenres}>
                      {genres.name}
                    </li>
                  ))}
                </p>
              </div>
            </div>
          </div>
        )}

        {trailer && (
          <div className={styles.playerMainWrapper}>
            {trailer.results.map(
              result =>
                result.type === 'Trailer' && (
                  <li key={result.id} className={styles.trailerList}>
                    <p className={styles.trailerName}>{result.name}</p>
                    <ReactPlayer
                      url={`${trailerUrl.TRAILER}${result.key}`}
                      controls
                    />
                  </li>
                ),
            )}
          </div>
        )}

        <div className={styles.shadow}>
          <ul className={styles.listAdditionalInf}>
            <li className={styles.itemAdditionalInf}>
              <Link
                to={`${match.url}/cast`}
                className={styles.linkAdditionalInf}
              >
                Cast
              </Link>
            </li>
            <li className={styles.itemAdditionalInf}>
              <Link
                to={`${match.url}/reviews`}
                className={styles.linkAdditionalInf}
              >
                Reviews
              </Link>
            </li>
          </ul>
          <Switch>
            <Route path={routes.CAST} component={Cast} />
            <Route path={routes.REVIEWS} component={Reviews} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default MovieDetails;
