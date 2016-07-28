import state, { STAGE_RESULTS } from 'src/server/state';

export default (app) => {
  app.get('/api/results', (req, res) => {
    if (state.stage().stage !== STAGE_RESULTS) {
      res.status(401).send("We're not done voting");
      return;
    }
    res.send(state.results());
  });
};
