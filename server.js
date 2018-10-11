const express = require('express');
const path = require('path');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


var prompt = require('prompt-sync')();
var AssistantV1 = require('watson-developer-cloud/assistant/v1');

const port = 3000
 
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});
http.listen(3008, function(){
  console.log('listening on *:3008'); 
});

// Example 4: implements app actions.


// Set up Assistant service wrapper.
var service = new AssistantV1({
  username: '08d9b263-4338-4631-85d0-736d8d13faf5', // replace with service username
  password: 'UAO7WIsYUREV', // replace with service password
  version: '2018-07-10'
});

var workspace_id = 'a805ad1f-548f-48e4-9f50-7a46607c4d4a'; // replace with workspace ID

// Start conversation with empty message.
service.message({
  workspace_id: workspace_id
  }, processResponse);

// Process the service response.
function processResponse(err, response) {
  if (err) {
    console.error(err); // something went wrong
    return;
  }

  var endConversation = false;

  // Check for client actions requested by the dialog. Assumes at most a single
  // action.
  if (response.actions) {
    if (response.actions[0].type === 'client') {
      if (response.actions[0].name === 'display_time') {
        // User asked what time it is, so we output the local system time.
        console.log('The current time is ' + new Date().toLocaleTimeString() + '.');
      } else if (response.actions[0].name === 'end_conversation') {
        // User said goodbye, so we're done.
        console.log(response.output.generic[0].text);
        endConversation = true;
      }
    }
  } else {
    // Display the output from dialog, if any. Assumes a single text response.
    if (response.output.generic.length != 0) {
        console.log(response.output.generic[0].text);
    }
  }

  // If we're not done, prompt for the next round of input.
  if (!endConversation) {
    var newMessageFromUser = prompt('>> ');
    service.message({
      workspace_id: workspace_id,
      input: { text: newMessageFromUser },
      // Send back the context to maintain state.
      context : response.context,
    }, processResponse)
  }
}