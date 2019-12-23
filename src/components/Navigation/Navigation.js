import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../routes';

//styles
import styles from './Navigation.module.css';

const Navigation = () => (
  <ul className={styles.listNav}>
    <li className={styles.li}>
      <NavLink
        exact
        to={routes.HOME}
        style={{ color: '#212121' }}
        activeStyle={{ color: 'palevioletred' }}
        className={styles.linkNav}
      >
        Home
      </NavLink>
    </li>
    <li className={styles.li}>
      <NavLink
        to={routes.MOVIES}
        style={{ color: '#212121' }}
        activeStyle={{ color: 'palevioletred' }}
        className={styles.linkNav}
      >
        Movies
      </NavLink>
    </li>
  </ul>
);

export default Navigation;
