var roomMessage=document.getElementsByClassName('room-message');
var users=document.getElementsByClassName('users');
var output=document.getElementById('output');
var feedback=document.getElementById('feedback');
var message=document.getElementById('message');
var send=document.getElementById('send');

const socket = io.connect('http://localhost:3000');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get('username');
const roomname = urlParams.get('roomname');
console.log(username, roomname);

roomMessage.innerHTML= `You are in room-${roomname}`;

/*
socket.emit('user-joined',{
	username: username,
	roomname: roomname
});

*/