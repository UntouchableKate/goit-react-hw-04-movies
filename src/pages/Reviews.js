import React, { Component } from 'react';

//services
import api from '../services/api-services';

//styles
import styles from './Reviews.module.css';

class Reviews extends Component {
  state = {
    reviews: [],
  };

  componentDidMount() {
    this.fetchDetails();
  }

  fetchDetails = () => {
    const moveId = this.props.match.params.movieId;
    api.fetchMovieReviews(moveId).then(reviews => {
      this.setState({ reviews: reviews.results });
    });
  };

  render() {
    const { reviews } = this.state;
    return (
      <div className={styles.reviewsWrapper}>
        {reviews.length === 0 ? (
          <div className={styles.dontAnyReviews}>
            {' '}
            We don't have any reviews for this movie.
          </div>
        ) : (
          <ul className={styles.listReviews}>
            {reviews.map(elem => (
              <li key={elem.id} className={styles.reviewsItem}>
                <h4 className={styles.authorIconReviews}>
                  {' '}
                  <span class="material-icons">account_circle</span>{' '}
                  <p className={styles.authorReviews}>{elem.author}</p>
                </h4>
                <p className={styles.reviewsContent}>{elem.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Reviews;
