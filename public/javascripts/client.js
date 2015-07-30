var introOne = document.querySelector('.intro-one')
var introTwo = document.querySelector('.intro-two')
var login = document.querySelector('.login')

arrOne = ['W', 'We', 'Wel', 'Welc']
arrTwo = ['', '', '', 'alk', 'illow', 'isteria', 'estern', 'aver', 'epy', 'ir', 'lt', 'ders', 'l', 'ling', 'ch', 'hes', 'ome']

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
      introTwo.style.color = 'black'
      clearInterval()
    }
  }, 100)
}
