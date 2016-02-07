//jshint -W117
//jshint -W097
'use strict';

window.addEventListener('touchstart', function (event) {
  event.preventDefault();
  $(window).trigger('key-space');
});

window.addEventListener('keydown', function (event) {
  // console.log(event.which);
  switch (event.which) {
    case 37:
      // left
      $(window).trigger('key-left');
      break;
    case 38:
      // up
      $(window).trigger('key-up');
      break;
    case 39:
      // right
      $(window).trigger('key-right');
      break;
    case 40:
      // down
      $(window).trigger('key-down');
      break;
    case 27:
      // esc
      $(window).trigger('key-esc');
      break;
    case 32:
      // space key
      $(window).trigger('key-space');
      break;
    case 82:
      // r key
      $(window).trigger('key-r');
      break;
  }
});
//# sourceMappingURL=keybindings.js.map
