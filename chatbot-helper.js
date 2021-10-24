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
async function get_intent(projectId = PROJECT_ID, message) {
  const sessionId = uuid.v4();
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'en-US',
      },
    },
  };
    // Send request and log result
    const responses = await sessionClient.detectIntent(request);

    const result = responses[0].queryResult;
  
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
      return result.intent.displayName;
    } else {
      console.log(`  No intent matched.`);
      return "No Intent Matched"
    }
    
  
}

module.exports = {
  get_intent
}
// (async () => {
//   await get_intent('lulokal','hi')
// })();