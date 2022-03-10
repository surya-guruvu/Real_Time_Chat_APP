const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');


const Schema=mongoose.Schema;

const user=new Schema({
});

user.plugin(passportLocalMongoose);
var Users=mongoose.model('user',user);

module.exports=Users;
