var fs = require('fs');
var text = fs.readFileSync('./words.txt', 'utf8' );

//split into an array
var words = text.trim().split(/\s+/);

module.exports = {
  checker: function(input) {
    if (words.indexOf(input) > -1) {
      return false;
    }
    for (var i = 0; i < words.length; i++) {
      if (words[i].indexOf(input) > -1) {
          return true;
      }
    }
    return false;
  }
}
