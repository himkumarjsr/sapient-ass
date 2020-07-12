import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import HackerNews from './Container/hackerNews';

import './App.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:page">
          <HackerNews/>
        </Route>
        <Redirect exact from="/" to="/0" />
      </Switch>
    </Router>
  );
}

export default App;
