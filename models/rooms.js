const mongoose=require('mongoose');

const Schema=mongoose.Schema;


const user=new Schema({
	username : {
		type:String,
		unique:true
	},

	socket_id : {
		type:String,
		unique:true
	}
},{
    timestamps:true,
});

const roomSchema=new Schema({
	roomname : {
		type:String,
		unique:true
	},

	users : [user]
},{
    timestamps:true,
});

var Rooms=mongoose.model('room',roomSchema);

module.exports=Rooms;