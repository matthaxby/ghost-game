var express = require('express')
var router = express.Router()
var game = require('../lib/checker')
var db = require('monk')(process.env.MONGOLAB_URI)
var games = db.get('games')



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user: req.user })
});

router.get('/games', function(req, res, next) {
  console.log(res.locals)
  if (req.isAuthenticated()) {
    res.render('games', { user: req.user })
  } else {
    res.redirect('/')
  }
});

router.get('/loser', function(req, res, next) {
  res.render('loser', { user: req.user })
})

router.post('/games', function(req, res, next) {
  if (game.checker(req.body.word) === false) {
  res.redirect('/loser')
} else {
  games.insert({word: req.body.word})
  console.log(res.locals)
  res.redirect('/games')
}
})


module.exports = router
