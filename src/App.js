import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SearchPage from './features/searchPage/searchPage';
import ResultPage from './features/resultPage/resultPage';
import SignaturePage from './features/signaturePage/signaturePage';
import LoadingPage from './features/loadingPage/loadingPage';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={'/'}>
          <SearchPage />
        </Route>
        <Route exact path={'/result'}>
          <ResultPage />
        </Route>
        <Route path={'/user/:id'}>
          <SignaturePage />
        </Route>
        <Route path={'/loading'}>
          <LoadingPage />
        </Route>
      </Switch>
    </Router>
  )
};