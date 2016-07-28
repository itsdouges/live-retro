import state from 'src/server/state';

export default (app) => {
  app.get('/master', (req, res) => {
    res.send("You're the master now");
    res.send(state.get());
  });

  let i = 0;
  app.post('/master/next', (req, res) => {
    state.set('stage', ++i);
    res.send(`Next!\n${state.getSerialised()}`);
  });

  app.post('/master/reset', (req, res) => {
    state.reset();
    res.send(`Reset!\n${state.getSerialised()}`);
  });
};
