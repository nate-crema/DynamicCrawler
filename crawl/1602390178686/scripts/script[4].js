/*

HTML-WRITTEN FILE || Script sequence: [4]

*/


window.addEventListener('load', function () {
  [].forEach.call(document.querySelectorAll('.open-collective-sponsors img'), function (img) {
    if (img.width === 1) {
      img.width = 0
      img.parentElement.style.margin = '0 -1px 0 0'
    }
  })
})
