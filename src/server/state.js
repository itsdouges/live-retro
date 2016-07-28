const state = {};

function get() {
  return state;
}

function getSerialised() {
  return JSON.stringify(state);
}

function set(key, value) {
  state[key] = value;
}

function reset() {
  Object.keys(state).forEach((key) => delete state[key]);
}

export default { get, getSerialised, set, reset };
