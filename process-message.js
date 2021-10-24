const fetch = require('node-fetch');
const uuid = require('uuid');


// You can find your project ID in your Dialogflow agent settings
const projectId = 'lulokal'; //https://dialogflow.com/docs/agents#settings
const sessionId = uuid.v4();
const languageCode = 'en-US';
const dialogflow = require('@google-cloud/dialogflow');
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
var nodemailer = require('nodemailer');
// Remember the Page Access Token you got from Facebook earlier?
// Don't forget to add it to your `variables.env` file.
const { FACEBOOK_ACCESS_TOKEN } = process.env;

const sendTextMessage = (userId, text) => {
  return fetch(
    `https://graph.facebook.com/v2.6/me/messages?access_token=${FACEBOOK_ACCESS_TOKEN}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        messaging_type: 'RESPONSE',
        recipient: {
          id: userId,
        },
        message: {
          text,
        },
      }),
    }
  );
}

const sendTemplateMessage = (userId) => {
    return fetch(
      `https://graph.facebook.com/v2.6/me/messages?access_token=${FACEBOOK_ACCESS_TOKEN}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          recipient: {
            id: userId,
          },
          message: {
            attachment: {
              payload: {
                elements: [
                  {
                    title: "Either you are pro python coder or just about to start",
                    image_url: "https://d1q6f0aelx0por.cloudfront.net/product-logos/library-python-logo.png?",
                    subtitle: "Python Course",
                    buttons: [
                      {
                        payload: "python",
                        type: "postback",
                        title: "Get discount"
                      }
                    ]
                  },
                  {
                    title: "Either you are pro NodeJs coder or just about to start",
                    subtitle: "NodeJs Course",
                    image_url: "https://usefulangle.com/img/thumb/nodejs.png",
                    buttons: [
                      {
                        type: "postback",
                        title: "Get discount",
                        payload: "NodeJs"
                      }
                    ]
                  }
                ],
                template_type: "generic"
              },
              type: "template"
            }
          }
        }),
      }
    );
  }

const sendAttachmentMessageReplyPythonIntent = (userId) => {
    return fetch(
      `https://graph.facebook.com/v2.6/me/messages?access_token=${FACEBOOK_ACCESS_TOKEN}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          recipient: {
            id: userId,
          },
          message: {
            attachment: {
              payload: {
                text: "Experiences in python?",
                buttons: [
                  {
                    title: "Newbie(0-2y)",
                    payload: "newbie",
                    type: "postback"
                  },
                  {
                    title: "Mid(2-4y)",
                    type: "postback",
                    payload: "middle"
                  }
                ],
                template_type: "button"
              },
              type: "template"
            }
          }
        }),
      }
    );
  }

const sendAttachmentMessageReplyNodejsIntent = (userId) => {
    return fetch(
      `https://graph.facebook.com/v2.6/me/messages?access_token=${FACEBOOK_ACCESS_TOKEN}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          recipient: {
            id: userId,
          },
          message: {
            attachment: {
              type: "template",
              payload: {
                buttons: [
                  {
                    payload: "newbie",
                    title: "Newbie(0-2y)",
                    type: "postback"
                  },
                  {
                    type: "postback",
                    title: "Mid(2-4y)",
                    payload: "middle"
                  }
                ],
                text: "Experiences in Nodejs?",
                template_type: "button"
              }
            }
          }
        }),
      }
    );
  }
module.exports = async (event, payload_type) => {
  if (payload_type==="message"){  
  message = event.message.text;
  }
  if (payload_type==="postback"){  
    message = event.postback.payload;  
    }
  const userId = event.sender.id;
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: languageCode,
      },
    },
  };

  const responses = await sessionClient
    .detectIntent(request);

    const result = responses[0].queryResult;
    // console.log(result)
    console.log(result.action)
    
    //   if (result.intent.displayName == }

    if (result.intent.displayName == "Default Welcome Intent"){
        await sendTextMessage(userId, 'Welcome to Generator Discount bot for Rino developer course')
        await sendTemplateMessage(userId)
        return ;      
    }
    if (result.intent.displayName == "python"){
        await sendAttachmentMessageReplyPythonIntent(userId)
        return;
    }
    if (result.intent.displayName == "intent_nodejs"){
        await sendAttachmentMessageReplyNodejsIntent(userId)
        return;
    }

    if (result.intent.displayName == "grade_experiences" || result.intent.displayName == "intent_nodejs_years_exp" || result.intent.displayName =="intent_python_years_experience"){
        var voucher_code = makeid(20)
        if (result.parameters.fields.senior_exp.stringValue.length > 0){
            await sendTextMessage(userId, "Please wait a secs... we generating your voucher code for senior exp"),
            await sendTextMessage(userId, "Here is your voucher code: "+  voucher_code.toString()),
            await sendTextMessage(userId, "Now you have your code, Is there anything that i can help again?")
            return
        }
        if (result.parameters.fields.junior_exp.stringValue.length > 0){
            await sendTextMessage(userId, "Please wait a secs... we generating your voucher code for junior exp")
            await sendTextMessage(userId, "Here is your voucher code: "+ voucher_code.toString())
            await sendTextMessage(userId, "Now you have your code, Is there anything that i can help again?")
            return
        
        }
     
    else{
        await sendTextMessage(userId, "We can't recognize your experience, please type your experience with other words")
        return
         }

    }

    if (result.intent.displayName == "intent_nodejs_years_help_yes"){
        await sendTextMessage(userId, "I only trained to handle voucher discount for your course")
        await sendTemplateMessage(userId)
        return;
    }
    if (result.intent.displayName == "intent_nodejs_years_help_no"){
        await sendTextMessage(userId, "Thanks For coming!")
        return;
    }

    if (result.intent.displayName == "intent_python_years_help_yes"){
        await sendTextMessage(userId, "I only trained to handle voucher discount for your course")
        await sendTemplateMessage(userId)
        return;
    }
    if (result.intent.displayName == "intent_python_years_help_no"){
        await sendTextMessage(userId, "Thanks For coming!")
        return;
    }

    if (result.intent.displayName == "Default Fallback Intent"){
        await sendTextMessage(userId, "I Don't Recognize your words, i'll study about it. please try another phrase")
    }
    if (result.action == "smalltalk.agent.acquaintance"){
        await sendTextMessage(userId, result.fulfillmentText)
    }
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}
