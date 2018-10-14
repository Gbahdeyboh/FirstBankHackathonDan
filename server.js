const express = require('express');
const path = require('path');

const app = express() 
const http = require('http').Server(app);
const io = require('socket.io')(http);
const prompt = require('prompt-sync')();
const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const port = 3000
 
app.use('/static', express.static('public')); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

//app.listen(port, () => console.log(`Example app listening on port ${port}!`))

var service = new AssistantV1({
   username: '08d9b263-4338-4631-85d0-736d8d13faf5', // replace with service username
   password:  'UAO7WIsYUREV', // replace with service password
   version: '2018-07-10'
});
  
var workspace_id = 'a805ad1f-548f-48e4-9f50-7a46607c4d4a' //
var socketId = "";
var username = "";
/*
io.use(async function(socket, next){
  socket.id = "conn";
  next()
});
*/
io.on('connection', function(socket){
    console.log('a user connected');
    console.log("The socket id is : ", socket.id);
    socketId = socket.id; 
    socket.on('start', function(msg){
      console.log(msg);
      service.message({
        workspace_id: workspace_id
      }, processResponse);
    })
});


// Start conversation with empty message.

var contexts = "";

function processResponse(err, response) {
            if (err) {
              console.error(err); // something went wrong
              return;
            }
          
            // If an intent was detected, log it out to the console.
            if (response.intents.length > 0) {
              console.log('Detected intent: #' + response.intents[0].intent);
            }
          
            // Display the output from dialog, if any. Assumes a single text response.
            if (response.output.generic.length != 0) {
                console.log(response.output.generic[0].text);
                contexts = response.context;
                io.emit('chat response', {data: response, username : username, msg : response.output.generic[0].text});
                console.log("To be viewed by username : ", username);
            }
         
        }


http.listen(process.env.PORT || 8081, function(){
  console.log('listening on *:8081');
});

io.on('connect', function(socket){
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
      username = msg.username
      console.log("Sender username is : ", username);
      //Send message to bot

       // Prompt for the next round of input.
            //var newMessageFromUser = prompt('>> ');
            service.message({
              workspace_id: workspace_id,
              input: { text: msg.msg },
              context : contexts,
            }, processResponse)

      //send bot reply to user
      //io.emit('chat message', msg);
    });
});





/*
// Example 2: adds user input and detects intents.

var prompt = require('prompt-sync')();
var AssistantV1 = require('watson-developer-cloud/assistant/v1');

// Set up Assistant service wrapper.
var service = new AssistantV1({
  username: 'a364eb0f-10cb-43df-b340-6785f192ebae', // replace with service username
  password: 'fKoSrPy7Mvxy', // replace with service password
  version: '2018-07-10'
});

var workspace_id = 'a0475a9e-4b66-4bba-b991-4cb8e80b0008'; // replace with workspace ID

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

  // If an intent was detected, log it out to the console.
  if (response.intents.length > 0) {
    console.log('Detected intent: #' + response.intents[0].intent);
  }

  // Display the output from dialog, if any. Assumes a single text response.
  if (response.output.generic.length != 0) {
      console.log(response.output.generic[0].text);
  }

  // Prompt for the next round of input.
  var newMessageFromUser = prompt('>> ');
  service.message({
    workspace_id: workspace_id,
    input: { text: "Hello" },
    context : response.context,
    }, processResponse)
}
*/
