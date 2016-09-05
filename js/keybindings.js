//jshint -W117
//jshint -W097
'use strict';

window.addEventListener('touchstart', (event) => {
  event.preventDefault()
  d3.select(window).dispatch('key-space')
})

window.addEventListener('keydown', (event) => {
  switch (event.which) {
    case 37: // left
      d3.select(window).dispatch('key-left')
      break
    case 38: // up
      d3.select(window).dispatch('key-up')
      break
    case 39: // right
      d3.select(window).dispatch('key-right')
      break
    case 40: // down
      d3.select(window).dispatch('key-down')
      break
    case 27: // esc
      d3.select(window).dispatch('key-esc')
      break
    case 32: // space key
      d3.select(window).dispatch('key-space')
      break
  }
})
