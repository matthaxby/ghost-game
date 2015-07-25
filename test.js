var fs = require('fs');
var text = fs.readFileSync('./words.txt', 'utf8' );

//split into an array
var words = text.trim().split(/\s+/);

console.log(words)
