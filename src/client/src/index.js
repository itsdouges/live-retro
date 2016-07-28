import React from 'react';
import { render } from 'react-dom';
import App from './views/App';
import VoteView from './views/VoteView';
import SubmitView from './views/SubmitView';
import ResultsView from './views/ResultsView';
import MasterView from './views/MasterView';
import ParticipantView from './views/ParticipantView';
import 'whatwg-fetch';
import 'normalize.css/normalize.css';
import { Router, Route, browserHistory } from 'react-router';

render(
  <Router history={browserHistory}>
    <Route path="" component={App}>
      <Route path="/" component={ParticipantView}>
        <Route path="submit" component={SubmitView} />
        <Route path="voting" component={VoteView} />
        <Route path="results" component={ResultsView} />
      </Route>
      <Route path="/master" component={MasterView}>
        <Route path="waiting" component={ResultsView} />
        <Route path="results" component={ResultsView} />
      </Route>
      <Route path="*" component={ParticipantView} />
    </Route>
  </Router>,
  document.getElementById('app')
);
