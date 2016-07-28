## Routes
* GET /master - the master page (you get the master key)
  - GET /api/master/state - get app state (using the master key)
  - POST /api/master/state - advance to next stage (using the master key)
  - DELETE /api/master/state - reset session (using the master key)
* GET / - the participant page
  - GET /api/participant/stage - get the current stage
  - POST /api/participant/submissions - submit a good/bad thing
  - GET /api/participant/submissions - show submissions
  - POST /api/participant/submissions/vote - vote on a good/bad submission
* GET /api/results - final results
