export const STAGE_SUBMIT = 'submit';
export const STAGE_VOTE = 'vote';
export const STAGE_RESULTS = 'results';

const state = {};

function get() {
  return state;
}

function setStage(stage) {
  if (stage !== STAGE_SUBMIT && stage !== STAGE_VOTE && stage !== STAGE_RESULTS) {
    throw new Error(`Invalid stage: ${stage}`);
  }
  state.stage = stage;
}

function getStage() {
  const { stage } = state;
  return { stage };
}

function addSubmission(submission) {
  if (!state.submissions[submission]) {
    state.submissions[submission] = 0;
  }
}

function voteSubmission(submission) {
  if (submission in state.submissions) {
    state.submissions[submission] += 1;
  }
}

const caseInsensitiveSort = (a, b) => {
  const aLower = a.toLowerCase();
  const bLower = b.toLowerCase();
  if (aLower < bLower) return -1;
  if (aLower > bLower) return 1;
  return 0;
};

function getSubmissions() {
  const submissions = Object.keys(state.submissions).sort(caseInsensitiveSort);
  return { submissions };
}

function getResults() {
  const { submissions } = state;
  return { submissions };
}

function reset() {
  state.stage = STAGE_SUBMIT;
  state.submissions = {};
}

export default {
  get,
  reset,
  setStage,
  stage: getStage,
  addSubmission,
  voteSubmission,
  submissions: getSubmissions,
  results: getResults,
};
