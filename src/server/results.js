import state from 'src/server/state';

export default (app) => {
  app.get('/api/results', (req, res) => {
    res.send(`Results:
      ${state.get()}
    `);
  });
};
