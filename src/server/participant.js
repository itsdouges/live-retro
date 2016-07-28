import state, { STAGE_VOTE } from 'src/server/state';

export default (app) => {
  app.get('/participant', (req, res) => {
    res.send('Hello!');
  });

  app.get('/api/participant/stage', (req, res) => {
    res.send(state.stage());
  });

  app.post('/api/participant/submissions', (req, res) => {
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

  app.post('/api/participant/vote', (req, res) => {
    state.voteSubmission(req.body.submission);
    res.sendStatus(200);
  });
};
