/* All the main scripts are written in this file */
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
