/*

HTML-WRITTEN FILE || Script sequence: [6]

*/


(function () {
  var topScrolled = false
  var sponsors = document.getElementById('sponsors')
  var sponsorTop = sponsors.offsetTop
  var sponsorActive = false

  window.addEventListener('resize', function () {
    sponsorTop = sponsors.offsetTop
  })

  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 165 && !topScrolled) {
      topScrolled = true
      document.getElementById('mobile-bar').classList.remove('top')
    } else if (window.pageYOffset <= 165 && topScrolled) {
      topScrolled = false
      document.getElementById('mobile-bar').classList.add('top')
    }
    if (window.pageYOffset > sponsorTop - 100) {
      if (!sponsorActive) {
        sponsorActive = true
        sponsors.classList.add('active')
      }
    } else {
      if (sponsorActive) {
        sponsorActive = false
        sponsors.classList.remove('active')
      }
    }
  })
})()
