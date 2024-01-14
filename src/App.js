import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import SearchPage from './pages/Search/SearchPage';
import HistoryPage from './pages/History/HistoryPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/history" component={HistoryPage} />
      </Switch>
    </Router>
  );
}

export default App;