## Routes
* GET /master - the master page (you get the master key)
  - POST /api/master/stage - advance to next stage (using the master key)
  - DELETE /api/master/results - reset session (using the master key)
* GET /participant - the participant page
  - GET /api/participant/stage - get the current stage
  - POST /api/participant/submit - submit a good/bad thing
  - POST /api/participant/vote - vote on a good/bad thing
* GET /api/results - final results
