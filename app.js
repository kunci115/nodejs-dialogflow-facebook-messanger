const express = require("express");
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
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



app.post('/', messageWebhook);

  

app.get('/', verifyWebhook);


app.listen(process.env.PORT || "3000");