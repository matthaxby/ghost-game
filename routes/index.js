var express = require('express')
var router = express.Router()
var game = require('../lib/checker')
var db = require('monk')(process.env.MONGOLAB_URI)
var games = db.get('games')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user: req.user })
});

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
      games.insert({player: req.user.id, word: ''})
    }
    res.rendxer('play', {user: req.user, games: doc})
  })
})

router.get('/instructions', function(req, res, next) {
  res.render('instructions', {user: req.user})
})

module.exports = router
