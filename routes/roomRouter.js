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
    /*
    Rooms.findOne({roomname:req.body.roomname})
    .then((room)=>{
        if(room!=null){
            res.statusCode=200;
            room.users.push({username:req.body.username});
            room.save()
            .then((room)=>{
                res.statusCode=200;
                
            }, (err) => next(err)) 
            
        }
        else{
            res.statusCode=200;
            Rooms.create({roomname:req.body.roomname,users:[{username:req.body.username}]})
            .then((room)=>{
                res.statusCode=200;
                res.redirect(`/rooms?username=${username}&roomname=${roomname}`)
            }, (err) => next(err))

        }
    })
    .catch((err)=>next(err));
    */
    //
})

.get((req, res)=>{
    res.statusCode=200;
    res.render('room');
});

module.exports=roomRouter;