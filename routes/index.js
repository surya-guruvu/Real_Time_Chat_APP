var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
<<<<<<< HEAD
  res.statusCode=200;
=======
  res.statusCode = 200;
>>>>>>> my-temporary-work
  res.render('index');
});

module.exports = router;