import React, { Component } from 'react';

//services
import api from '../services/api-services';

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
      <div>
        {reviews.length === 0 ? (
          <div> We don't have any reviews for this movie.</div>
        ) : (
          <ul>
            {reviews.map(elem => (
              <li key={elem.id}>
                <h4> Author: {elem.author}</h4>
                <p>{elem.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Reviews;
