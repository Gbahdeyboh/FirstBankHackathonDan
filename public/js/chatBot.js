/* All scripts regarding how the bot interacts with the customer are written below*/
 //The below date object is used later in the code to get when each message was sent
 var dt = new Date(); 
 var hours = dt.getHours();    
 var minutes = dt.getMinutes();
 var seconds = dt.getSeconds(); 
 var dayLight; /*This variable is iterated later and depicts if the present time is Morning or Afternoon*/
 //Get the present dayTime at which message was sent
     if(hours > 11){ //If 12pm has passed
         dayLight = "PM";
     }
     else{//If its still morning
         dayLight = "AM";
     }
 function removeAnimate(){ 
     setTimeout(function(){
        var vl = document.querySelectorAll(".oh"); //get all new messages
        vlNum = vl.length - 1; //get the last message with the "animate" class
        vl[vlNum].classList.remove("animate"); //Remove the "animate" class from this before proceeding
     }, 50);
 }
function sendMessage(message){
    setTimeout(function(){
        removeAnimate();
    }, 50)
    const chatBody = document.querySelector('#chatBody');
    //This function sends a newly typed message
    chatBody.innerHTML += `
        <div class="row full">
            <div class="col s10 right">
                <div class="botMessage z-depth-2 animate oh rightVal">
                ${message}
                </div>
            </div>
        <div class="col s2 timeStamp">${hours}:${minutes}:${seconds}<br />${dayLight}</div>
        </div>
        `
    document.querySelector('#chatBody').scrollTop += 10000000000;
}
function receiveMessage(){
    //This function replies the users message
}
document.addEventListener('DOMContentLoaded', function(){
    const messageBody = document.querySelector('#input');
    const chatBody = document.querySelector('#chatBody');
    messageBody.addEventListener('keydown', function(event){
        if(event.keyCode == 13 && messageBody.value !== "" && messageBody.value !== " "){
            //Get message to be sent
            var message = document.querySelector('#input').value;
            sendMessage(message);
        //Clear the input field after sending message
        document.querySelector('#input').value = "";
        }
    });
});