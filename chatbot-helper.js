const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
require("dotenv").config();
const { FACEBOOK_ACCESS_TOKEN } = process.env;
const { PROJECT_ID } = process.env;
/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
//  module.exports ={
async function dialogflow_handler(projectId = PROJECT_ID) {
  const sessionId = uuid.v4();
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
  console.log(sessionPath)
  return sessionPath, sessionId
  
}

module.exports = {
  dialogflow_handler
}
// (async () => {
//   await get_intent('lulokal','hi')
// })();