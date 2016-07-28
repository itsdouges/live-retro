import state from 'src/server/state';

export default (app) => {
  app.get('/', (req, res) => {
    res.send(`Hello!\n${state.getSerialised()}`);
  });
};
