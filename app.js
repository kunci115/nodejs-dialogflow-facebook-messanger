const express = require("express");
const app = express();
const verifyWebhook = require('./verify-webhook');
const messageWebhook = require('./message-webhook');

app.use(
    express.urlencoded({
      extended: true
    })
  )
app.use(express.json())



app.post('/webhook', messageWebhook);


app.get('/webhook', verifyWebhook);

app.get("/", (req, res)=> {
    console.log("hello world")
    res.send("helloworld")
})
app.listen(process.env.PORT || "3000");