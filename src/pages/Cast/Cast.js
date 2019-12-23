import React, { Component } from 'react';

//services
import api from '../../services/api-services';
import photoUrl from '../../services/photoURL';

//styles
import styles from './Cast.module.css';

class Cast extends Component {
  state = {
    cast: null,
  };

  componentDidMount() {
    this.fetchCast();
  }

  fetchCast = () => {
    const movieId = this.props.match.params.movieId;

    api.fetchMovieCast(movieId).then(cast => {
      this.setState({ cast });
    });
  };

  render() {
    const { cast } = this.state;
    return (
      <>
        {cast && (
          <ul>
            {cast.map(elem => (
              <li key={elem.credit_id}>
                {elem.profile_path && (
                  <div>
                    <img
                      src={`${photoUrl.PHOTO}${elem.profile_path}`}
                      alt={elem.name}
                      className={styles.imgWrapper}
                    />
                  </div>
                )}
                <p>{elem.name}</p>
                <p>Character: {elem.character}</p>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default Cast;
