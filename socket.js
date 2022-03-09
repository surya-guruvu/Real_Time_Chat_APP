const Rooms=require("./models/rooms.js");
const getUsers=require("./getOnlineUsers");
module.exports= (io)=>{
	io.on('connection',(socket)=>{
		socket.on('user-joined',(data)=>{

			//Joining a socket room
			socket.join(data.roomname);

			console.log(socket.rooms);

			io.to(data.roomname).emit('user-joined',{username:data.username});

			usersOnline=[];
		    Rooms.findOne({roomname:data.roomname})
		    .then((room)=>{
		        if(room!=null){
		            room.users.push({username:data.username,socket_id: socket.id});
		            room.save()
		            .then((room)=>{
						room.users.forEach(user=>{
							usersOnline.push(user.username);
						});
						io.to(data.roomname).emit('users-online',usersOnline);

		            }, (err) => next(err));
		            
		        }
		        else{
		            Rooms.create({roomname:data.roomname,users:[{username:data.username,socket_id: socket.id}]})
		            .then((room)=>{
						room.users.forEach(user=>{
							usersOnline.push(user.username);
						});
						io.to(data.roomname).emit('users-online',usersOnline);
		            }, (err) => next(err));

		        }
		    },(err)=>next(err));



		});

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

		        }, (err) => next(err));
		            
		    },(err)=>next(err));
		    
		    
		})

	});
}