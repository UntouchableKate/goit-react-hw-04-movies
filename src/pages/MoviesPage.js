import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//services
import api from '../services/api-services';
import photoUrl from '../services/photoURL';

//routes
import routes from '../routes';

//styles
import styles from '../pages/HomePage.module.css';
import noPosterImage from '../photo.jpg';
import backButtonStyles from '../pages/MovieDetails/MovieDetails.module.css';

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

  goBack = () => {
    if (this.props.location.state && this.props.location.state.from) {
      this.props.history.push(this.props.location.state.from);

      return;
    }

    this.props.history.push(routes.HOME);
  };

  render() {
    const { match } = this.props;
    const { movie } = this.state;
    return (
      <div className={styles.wrapper}>
        <div>
          <button
            type="button"
            onClick={this.goBack}
            className={backButtonStyles.buttonGoBack}
          >
            <span class="material-icons">arrow_back_ios</span>
          </button>
        </div>
        <ul className={styles.listWrapper}>
          {movie.map(movie => (
            <li key={movie.id} className={styles.itemWrapper}>
              <Link
                className={styles.linkStyle}
                to={{
                  pathname: `${match.url}/${movie.id}`,
                  state: { from: this.props.location },
                }}
              >
                <div className={styles.posterWrapper}>
                  {movie.poster_path ? (
                    <img
                      className={styles.imageStyle}
                      src={`${photoUrl.PHOTO}${movie.poster_path}`}
                      alt={movie.title}
                    />
                  ) : (
                    <div>
                      <img
                        src={noPosterImage}
                        className={styles.imageStyle}
                        alt={'Film poster'}
                      />
                    </div>
                  )}

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
    );
  }
}

export default MoviesPage;
