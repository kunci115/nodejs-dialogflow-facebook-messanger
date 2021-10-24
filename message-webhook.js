const processMessage = require('./process-message');

module.exports = (req, res) => {
  if (req.body.object === 'page') {
    //   console.log(req.body)
    req.body.entry.forEach(entry => {
        // console.log(entry.messaging.postback)
      entry.messaging.forEach(event => {
        console.log(event.postback)
        // console.log(event)
        if (event.message && event.message.text) {
            
          processMessage(event, "message");
        }
        if (event.postback && event.postback.payload) {
            processMessage(event, "postback");
        }
        
      });
    });

    res.status(200).end();
  }
};