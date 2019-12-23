import React from 'react';

//routing
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import routes from '../../routes';

//components
import Navigation from '../Navigation';

//pages
import HomePage from '../../pages/HomePage';
import MoviesPage from '../../pages/MoviesPage';
import MovieDetails from '../../pages/MovieDetails';

//{`${this.props.match.path}/:movieId`}
//{'/movies/:movieId'}

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Navigation />
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
