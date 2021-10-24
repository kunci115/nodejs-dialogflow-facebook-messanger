function facebook_quick_replies(text, payload, title){
    var payload_quick_replies = {
        "facebook": {
            "text": text,
            "quick_replies":[
                {
                    "content_type":"text",
                    "payload": payload,
                    "title": title
                }
            ]
        }
    }
    return payload_quick_replies
}


function welcome(agent) {
    
    var payload = {
        "facebook": {
          "attachment": {
            "payload": {
              "elements": [
                {
                  "title": "Either you are pro python coder or just about to start",
                  "image_url": "https://d1q6f0aelx0por.cloudfront.net/product-logos/library-python-logo.png?",
                  "subtitle": "Python Course",
                  "buttons": [
                    {
                      "payload": "python",
                      "type": "postback",
                      "title": "Get discount"
                    }
                  ]
                },
                {
                  "title": "Either you are pro NodeJs coder or just about to start",
                  "subtitle": "NodeJs Course",
                  "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
                  "buttons": [
                    {
                      "type": "postback",
                      "title": "Get discount",
                      "payload": "NodeJs"
                    }
                  ]
                }
              ],
              "template_type": "generic"
            },
            "type": "template"
          }
        }
      }
    console.log(JSON.parse(JSON.stringify(agent.content_type)))
    // agent.add('Welcome to xyz discount code course generator');
    // agent.add(new Payload(agent.FACEBOOK, payload, {sendAsMessage:true}));
    
}


function defaultFallback(agent) {
    agent.add('Sorry! I am unable to understand this at the moment. I am still learning humans. You can pick any of the service that might help me.');
}
module.exports = { welcome: welcome, defaultFallback: defaultFallback };