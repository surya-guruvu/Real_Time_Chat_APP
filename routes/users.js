var express = require('express');
const bodyParser=require('body-parser');
var User=require('../models/user');
var passport = require('passport');

const router=express.Router();

router.get('/', function(req, res, next) {
	res.statusCode = 200;
	res.render('login');
});



router.get('/login', function(req, res, next) {
	res.statusCode = 200;
	res.render('login');
});

router.get('/signup', function(req, res, next) {
	res.statusCode = 200;
	res.render('signup');
});


router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.redirect(`/index?username=${req.body.username}`);
      });
    }
  });
});


router.post('/login', passport.authenticate('local'), (req, res) => {
	res.statusCode = 200;
 	res.redirect(`/index?username=${req.body.username}`);
});



module.exports = router;