/* All the main scripts are written in this file */
//register a service worker
document.addEventListener('DOMContentLoaded', function(){
    if('serviceWorker' in navigator){
        navigator.serviceWorker.register('../../sw.js')
        .then(worker => {
            console.log("Service Worker registered : ", worker);
        })
        .catch(err => {
            console.error(err);
        });
    }
}); 
function openChat(){
    //This function opens a new chat
    const botBody = document.querySelector('#chatBotBody'); //the chat bot body
    botBody.style.display =  "block"; //show the bot body
    //wait for 500 milli seconds for animation to complete before proceeding
    setTimeout(showBotBody => { //show the main bot body after animation
        const botBodyBody = document.querySelector('#chatBotBodyBody');
        botBodyBody.style.display = "block";
    }, 500);
} 
function closeChat(){
    //This function closes the chat Body
    const botBody = document.querySelector('#chatBotBody'); //the chat bot body
    const botBodyBody = document.querySelector('#chatBotBodyBody'); //close the messages body
    botBody.style.display =  "none"; //show the bot body
    botBodyBody.style.display = "block";
}

//Add to home screen is triggerred here
var installPromptEvent;

window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    event.preventDefault();
    // Stash the event so it can be triggered later.
    installPromptEvent = event;
    // Update UI notify the user they can add to home screen
    //btnAdd.style.display = 'block';
  });
document.addEventListener('DOMContentLoaded', function(){
    const btnAdd = document.querySelector('#yes');
  btnAdd.addEventListener('click', (event) => {
    // hide our user interface that shows our A2HS button
    btnAdd.style.display = 'none';
    // Show the prompt
    installPromptEvent.prompt();
    // Wait for the user to respond to the prompt
    installPromptEvent.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        installPromptEvent = null;
      });
  });
});
