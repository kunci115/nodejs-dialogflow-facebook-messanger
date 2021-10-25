# About App Course Chatbot

1. Chatbot should be triggered with greet intent or something, it will return suggestion what course 
discount that they want to get, i made only 2 courses discount generator(nodejs and python)
2. After picking the domain the user is interested in, he/she should be asked about
his/her experience in the field, in this case only junior and senior intent will be classified.
3. The bot should then respond with a suggestion of a specific course accompanied by
a custom voucher code immediately after this user has provided his/her experience in
years.
4. A friendly reminder should be sent to the user within 24h of receiving the voucher
letting him know that the voucher is valid for a limited time


# Architecture
The Architecture of this chatbot is:

- UI (assume Facebook Messanger) -> send data to this chatbot -> detect intent and actions with dialogflow

# Time Completion
Time completion on every issue logged in each commit, but from my side:
- restudy nodejs on wednesday (20 oct 2021)
- learn to create chatbot on dialogflow, because usually in python i'm using RASA (20 oct 2021)
- 20 Oct Chatbot only returning responses through dialog flow fulfillment which is node js is not there yet
- 22 October after working hours(study dialogflow stories again, because i don't know before if dialogflow can have following intent inside intent)
- 23 October start to develop this repository as a middleware and response handler
- 24 October Chatbot finished
- 25 October Create this readme and fix some issues (deployment ready)

I deploy it on heroku https://chatbot-service-rino.herokuapp.com/
in order to chat https://www.facebook.com/rinodevelopercourse/ , the application still in review mode by fb
Kazam_screenrecord is demo for this


# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 8.0.0


# Getting started
- Clone the repository
```
git clone git@github.com:kunci115/nodejs-dialogflow-facebook-messanger.git
```
- Install dependencies
```
cd <project_name>
npm install
```
- Build and run the project
```
node app.js
```
  Navigate to `http://localhost:3000`

- API Document endpoints

   http://localhost:3000/ (get to verify key from facebook, post to do chat from facebok) 
