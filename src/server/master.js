import state from 'src/server/state';

const debug = require('debug')('retro:master');

const FALLBACK_KEY = process.env.FALLBACK_KEY || 'super-secret';
const MASTER_EXPIRES_DURATION = (process.env.EXPIRE_MASTER || 60) * 60 * 1000;
const MASTER_KEY_COOKIE = 'master-key';

let masterKey = null;

function newKey() {
  const hash = `${Date.now()}`.slice(-4);
  return `master-${hash}`;
}

function resetKey() {
  debug('no more master');
  masterKey = null;
}

export default (app) => {
  app.use('/master', (req, res, next) => {
    if (masterKey) {
      debug('we already have a master', masterKey);
      res.status(401).end('We already have a master');
      return;
    }
    masterKey = newKey();
    debug('we have a new master', masterKey);
    res.cookie(MASTER_KEY_COOKIE, masterKey, {
      expires: new Date(Date.now() + MASTER_EXPIRES_DURATION),
    });
    setTimeout(resetKey, MASTER_EXPIRES_DURATION);
    next();
  });

  app.use('/api/master(/*)?', (req, res, next) => {
    const receivedKey = req.cookies[MASTER_KEY_COOKIE] || req.get(MASTER_KEY_COOKIE);
    if (!masterKey) {
      res.status(500).end('There is no master');
      return;
    }
    if (receivedKey !== masterKey && receivedKey !== FALLBACK_KEY) {
      res.status(401).end("You're not the master");
      return;
    }
    next();
  });

  app.delete('/api/master', (req, res) => {
    resetKey();
    res.send(204);
  });

  app.get('/api/master/state', (req, res) => {
    res.send(state.get());
  });

  app.post('/api/master/state', (req, res) => {
    if (req.body.stage) {
      state.setStage(req.body.stage);
    }
    res.send(state.get());
  });

  app.delete('/api/master/state', (req, res) => {
    state.reset();
    res.send(state.get());
  });
};
