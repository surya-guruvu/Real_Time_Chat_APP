const rooms=require("./models/rooms");

module.exports=(roomname,usersOnline)=>{
	rooms.findOne({roomname:roomname})
	.then((room)=>{
		room.users.forEach(user=>{
			usersOnline.push(user.username);
		});
		console.log(usersOnline);
	})
	.catch((err)=>next(err));
}