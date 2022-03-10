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
    res.statusCode=200;
    res.redirect(`/rooms?username=${username}&roomname=${roomname}`);
})

.get((req, res)=>{
    res.statusCode=200;
    res.render('room');
});

module.exports=roomRouter;