const socket = io();

let name = prompt("Enter your name:")
let textarea = document.querySelector('#textarea');

let messageArea = document.querySelector('.message__area')

textarea.addEventListener('keyup',function(e){
    if(e.key == "Enter"){
        sendMessage(e.target.value)
    }
})
// function to send message
function sendMessage(message){
    let msg = {
        user:name,
        message:message
    }

    // Append message to DOM
    appendMessage(msg,'outgoing');

    // send message to socket server
    socket.emit('message',msg)
}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div');
    let className = type
    mainDiv.classList.add(className,'message')

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML =markup;
    messageArea.appendChild(mainDiv)

}
//scrollTobottom code
function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;

}

//recieve messages
socket.on('message',function(msg){
appendMessage(msg,'incoming');
scrollToBottom()
})