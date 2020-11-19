import React, { Component } from 'react';

//services
import api from '../../services/api-services';
import photoUrl from '../../services/photoURL';

//styles
import styles from './Cast.module.css';
import icon from '../../icon.svg';

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
      <div className={styles.mainCastWrapper}>
        {cast && (
          <ul className={styles.listCast}>
            {cast.map(elem => (
              <li key={elem.credit_id} className={styles.itemCast}>
                {elem.profile_path ? (
                  <div className={styles.wrapperPhoto}>
                    <img
                      src={`${photoUrl.PHOTO}${elem.profile_path}`}
                      alt={elem.name}
                      className={styles.imgWrapper}
                    />
                  </div>
                ) : (
                  <div className={styles.noPhotoWrapper}>
                    <img
                      src={icon}
                      alt={elem.name}
                      className={styles.iconStyle}
                    ></img>
                  </div>
                )}
                <p className={styles.nameCast}>{elem.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Cast;
