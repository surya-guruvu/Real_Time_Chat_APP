const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');


const Schema=mongoose.Schema;

const user=new Schema({
<<<<<<< HEAD

	username : {
		type:String,
		//unique:true,
		required:true
	}

	password : {
		type:String,
		required:true
	}

=======
>>>>>>> my-temporary-work
});

user.plugin(passportLocalMongoose);
var Users=mongoose.model('user',user);

module.exports=Users;
