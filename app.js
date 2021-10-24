const express = require("express");
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const { welcome, defaultFallback } = require("./intents/welcomeExit");
const {get_intent} = require("./chatbot-helper")
const app = express();
const verifyWebhook = require('./verify-webhook');
const messageWebhook = require('./message-webhook');

app.use(
    express.urlencoded({
      extended: true
    })
  )
app.use(express.json())

app.post('/webhook', (req, res) => {
    // console.log(req.body)
    message = jsonParser(req.body)
    // console.log(data)
    // res.send(data)
    get_intent('lulokal', message)
    .then((data) => {
      res.send(data);
        // console.log(data)
    })
    // .catch((err) => console.log(err));
  })

app.post('/', messageWebhook);

  
function jsonParser(stringValue) {

    var string = JSON.stringify(stringValue);
    var objectValue = JSON.parse(string);
    return objectValue['text'];
 }

app.get('/', verifyWebhook);

app.get("/", (req, res)=> {
    console.log("hello world")
    res.send("helloworld")
})
app.listen(process.env.PORT || "80");