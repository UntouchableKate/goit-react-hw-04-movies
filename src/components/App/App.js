import React from 'react';

//routing
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import routes from '../../routes';

//pages
import HomePage from '../../pages/HomePage';
import MoviesPage from '../../pages/MoviesPage';
import MovieDetails from '../../pages/MovieDetails';

//styles
import styles from './App.module.css';

//{`${this.props.match.path}/:movieId`}
//{'/movies/:movieId'}

const App = () => (
  <BrowserRouter>
    <div className={styles.app}>
      <Switch>
        <Route path={routes.HOME} exact component={HomePage} />
        <Route path={routes.DETAILS} component={MovieDetails} />
        <Route path={routes.MOVIES} component={MoviesPage} />

        <Redirect to={routes.HOME} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
