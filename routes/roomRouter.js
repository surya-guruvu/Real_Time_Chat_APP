const express=require('express');

const bodyParser=require('body-parser');

const mongoose=require('mongoose');

const Rooms = require('../models/rooms');

const roomRouter=express.Router(); 
roomRouter.use(bodyParser.json());

roomRouter.route('/')

.post((req,res,next)=>{    
    var username=req.body.username;
    var roomname=req.body.roomname;
<<<<<<< HEAD
    res.status=200;
=======
    res.statusCode=200;
>>>>>>> my-temporary-work
    res.redirect(`/rooms?username=${username}&roomname=${roomname}`);
})

.get((req, res)=>{
<<<<<<< HEAD
    res.status=200;
=======
    res.statusCode=200;
>>>>>>> my-temporary-work
    res.render('room');
});

module.exports=roomRouter;