import state, { STAGE_SUBMIT, STAGE_VOTE } from 'src/server/state';

const debug = require('debug')('retro:participant');

export default (app) => {
  app.get('/api/participant/stage', (req, res) => {
    res.send(state.stage());
  });

  app.post('/api/participant/submissions', (req, res) => {
    if (state.stage().stage !== STAGE_SUBMIT) {
      res.status(401).end("You can't submit any more");
      return;
    }
    const { submission, mood } = req.body;
    const added = state.addSubmission(submission, mood);
    if (added) {
      debug('Submitted', submission);
      res.sendStatus(201);
    } else {
      res.sendStatus(200);
    }
  });

  app.get('/api/participant/submissions', (req, res) => {
    if (state.stage().stage !== STAGE_VOTE) {
      res.status(401).send("We're not voting yet");
      return;
    }
    res.send(state.submissions());
  });

  app.post('/api/participant/submissions/vote', (req, res) => {
    if (state.stage().stage !== STAGE_VOTE) {
      res.status(401).end("We're not voting yet");
      return;
    }
    const { submission } = req.body;
    const voted = state.voteSubmission(submission);
    if (voted) {
      debug('Voted for', submission);
      res.sendStatus(204);
    } else {
      res.sendStatus(200);
    }
  });
};
