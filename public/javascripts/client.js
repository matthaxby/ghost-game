var introOne = document.querySelector('.intro-one')
var introTwo = document.querySelector('.intro-two')

arrOne = ['g', 'gh', 'gho', 'ghos']
arrTwo = ['', '','', 'able', 'loat', 'ladly', 'astronic', 'ee', 'ee', 'etto', 'etto', 'ul', 'ul', 'ul', 'ul', 't', 't',]

console.log(introOne)
if (introOne) {
  var indexOne = 0
  var indexTwo = 0
  setInterval(function() {
    if (indexOne < arrOne.length) {
      introOne.innerHTML = arrOne[indexOne]
      indexOne++
    } else {
      clearInterval()
    }
  }, 400)
  setInterval(function() {
    if (indexTwo < arrTwo.length) {
      introTwo.innerHTML = arrTwo[indexTwo]
      indexTwo++
    } else {
      clearInterval()
    }
  }, 100)
}
