import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Dashboard from './Dashboard';
import Tweet from './Tweet';
import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Dashboard} />
    <Route path="/tweet" component={Tweet} />
  </Router>,
  document.getElementById('root')
);
