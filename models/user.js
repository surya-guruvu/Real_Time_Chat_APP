const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const user=new Schema({

	username : {
		type:String,
		//unique:true,
		required:true
	}

	password : {
		type:String,
		required:true
	}

});

var Users=mongoose.model('user',user);

module.exports=Users;
