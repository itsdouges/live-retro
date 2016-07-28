import state, { STAGE_SUBMIT, STAGE_VOTE } from 'src/server/state';

export default (app) => {
  app.get('/', (req, res) => {
    res.send('Hello participant!');
  });

  app.get('/api/participant/stage', (req, res) => {
    res.send(state.stage());
  });

  app.post('/api/participant/submissions', (req, res) => {
    if (state.stage().stage !== STAGE_SUBMIT) {
      res.status(401).send("You can't submit any more");
      return;
    }
    state.addSubmission(req.body.submission);
    res.sendStatus(201);
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
      res.status(401).send("We're not voting yet");
      return;
    }
    const voted = state.voteSubmission(req.body.submission);
    if (voted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(200);
    }
  });
};
