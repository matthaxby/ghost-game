var express = require('express')
var router = express.Router()
var game = require('../lib/checker')
var db = require('monk')(process.env.MONGOLAB_URI)
var games = db.get('games')
var players = db.get('players')



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user: req.user })
});



router.get('/games/:id', function(req, res, next) {
  if (req.isAuthenticated()) {
    console.log(req.user.id)
    games.findOne({player: req.user.id}, function(err, doc) {
      if (!doc) {
        console.log('a')
        games.insert({player: req.user.id})
        res.redirect('/games/' + req.user.id)
      } else {
        console.log('b')
        console.log(doc)
        res.render('games', {user: req.user, games: doc})
      }
    })
  } else {
    res.redirect('/')
  }
})

router.post('/play', function(req, res, next) {
  games.findOne({player: req.user.id}, function (err, doc) {
    if (req.body.front) {
      var newWord = req.body.front.toLowerCase() + doc.word
    } else {
      var newWord = doc.word + req.body.back.toLowerCase()
    }
    console.log(newWord)
    if (game.checker(newWord) === 'nope') {
      var coulda = game.possible(doc.word)
      games.update({player: req.user.id}, {player: req.user.id, word: ''})
      res.render('play', {user: req.user, games: doc, damn: newWord, couldBe: coulda})
    } else if (game.checker(newWord) === false && newWord.length > 3) {
      games.update({player: req.user.id}, {player: req.user.id, word: ''})
      res.render('play', {user: req.user, games: doc, darn: newWord})
    } else {
      games.update({player: req.user.id}, {player: req.user.id, word: newWord})
      res.redirect('/play')
    }
  })
})

router.get('/play', function(req, res, next) {
  games.findOne({player: req.user.id}, function(err, doc) {
    if (!doc) {
      console.log('a')
      games.insert({player: req.user.id})
    }
    res.render('play', {user: req.user, games: doc})
  })
})

router.post('/games/:id', function (req, res, next) {
  games.update({player: req.user.id}, {player: req.user.id, games: {word: 'buc'}})
  res.redirect('/games/' + req.user.id)
})


router.get('/instructions', function(req, res, next) {
  res.render('instructions', {user: req.user})
})



module.exports = router
