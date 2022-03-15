const Rooms=require("./models/rooms.js");
const getUsers=require("./getOnlineUsers");
module.exports= (io)=>{
	io.on('connection',(socket)=>{
		socket.on('user-joined',(data)=>{

			//Joining a socket room
			socket.join(data.roomname);

			io.to(data.roomname).emit('user-joined',{username:data.username});

			usersOnline=[];
			console.log(data.roomname);
		    Rooms.findOne({roomname:data.roomname})
		    .then((room)=>{
		        if(room!=null){
		        	console.log(socket.id);
		        	console.log(data.username);
		        	var found=0;
		        	for(var i=0;i<room.users.length;i++){
		        		if(room.users[i].username==data.username){
		        			found=1;
		        			break;
		        		}
		        	}
<<<<<<< HEAD

		        	if(found==0){
			            room.users.push({username:data.username,socket_id: socket.id});
			            room.save()
			            .then((room)=>{
							room.users.forEach(user=>{
								usersOnline.push(user.username);
								console.log(usersOnline);
							});
							io.to(data.roomname).emit('users-online',usersOnline);

			            }, (err) => socket.emit('error',{ermsg:err.message,status:err.status,stack:err.stack}));
		        	}
		        	else{
		        		/*
		        		room.users.forEach(user=>{
							usersOnline.push(user.username);
							console.log(usersOnline);
						});
						io.to(data.roomname).emit('users-online',usersOnline);
						*/

=======

		        	if(found==0){
			            room.users.push({username:data.username,socket_id: socket.id});
			            room.save()
			            .then((room)=>{
							room.users.forEach(user=>{
								usersOnline.push(user.username);
								console.log(usersOnline);
							});
							io.to(data.roomname).emit('users-online',usersOnline);

			            }, (err) => socket.emit('error',{ermsg:err.message,status:err.status,stack:err.stack}));
		        	}
		        	else{
>>>>>>> my-temporary-work
						socket.emit("duperror","User is already Logged in");
		        	}
		            
		        }
		        else{
		            Rooms.create({roomname:data.roomname,users:[{username:data.username,socket_id: socket.id}]})

		            .then((room)=>{
		            	console.log(room.roomname);
						room.users.forEach(user=>{
							usersOnline.push(user.username);
						});
						io.to(data.roomname).emit('users-online',usersOnline);
		            }, (err) => socket.emit('error',{ermsg:err.message,status:err.status,stack:err.stack}));

		        }
		    },(err) => socket.emit('error',{ermsg:err.message,status:err.status,stack:err.stack}));
<<<<<<< HEAD
=======

>>>>>>> my-temporary-work


		});

		socket.on('msgSent',(data)=>{
			io.to(data.roomname).emit('msgSent',{username:data.username,message:data.message});
		});

		socket.on('typing',(data)=>{
			socket.broadcast.to(data.roomname).emit('typing',{username:data.username});
		})

		socket.on('disconnecting',()=>{
			
            const rooms = socket.rooms;
            var roomname='0';

            socket.rooms.forEach((value)=>{
            		roomname=value;
            })

            console.log(roomname);
            
            
			usersOnline=[];
		    Rooms.findOne({roomname:roomname})
		    .then((room)=>{
		       	room.users.forEach((user,index)=>{
		       		if(user.socket_id === socket.id){
		       			room.users.splice(index,1);
		       		}
		       	});
		        room.save()
		        .then((room)=>{
					room.users.forEach(user=>{
						usersOnline.push(user.username);
					});
					io.to(roomname).emit('users-online',usersOnline);

		        }, (err) => socket.emit('error',{ermsg:err.message,status:err.status,stack:err.stack}));
		            
		    },(err) => socket.emit('error',{ermsg:err.message,status:err.status,stack:err.stack}));
		    
		    
		})

	});
}