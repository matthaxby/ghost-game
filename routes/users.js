var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res){
  res.render('index', { user: req.user });
});

router.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

router.get('/login', function(req, res){
  console.log(req)
  res.render('login', { user: req.user });
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

module.exports = router;
