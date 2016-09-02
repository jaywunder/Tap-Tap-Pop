/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	//jshint -W117
	//jshint -W097
	'use strict';

	// require('../lib/jquery-2.2.0.min.js')
	// require('../lib/two.min.js')

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _d = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"d3\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var d3 = _interopRequireWildcard(_d);

	var _util = __webpack_require__(2);

	var utils = _interopRequireWildcard(_util);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	__webpack_require__(1);
	// require('./util.js')

	var Game = function () {
	  function Game() {
	    var _this = this;

	    _classCallCheck(this, Game);

	    this.isMobile = typeof window.orientation !== 'undefined';
	    this.running = true;

	    // Make an instance of two and place it on the page.
	    this.elem = document.getElementById('draw-shapes');
	    this.params = { width: window.innerWidth, height: window.innerHeight };
	    this.two = new Two(this.params).appendTo(this.elem);

	    this.centerRadius = this.two.height / 8;
	    this.centerX = this.two.width / 2;
	    this.centerY = this.two.height / 2;
	    this.thickness = this.two.height / 20;

	    this.background = this.two.makeRectangle(this.centerX, this.centerY, this.two.width, this.two.height);
	    this.centerCircle = this.two.makeCircle(this.centerX, this.centerY, this.centerRadius);
	    this.smallCircle = this.two.makeEllipse(this.centerX - this.centerRadius, this.centerY, this.thickness * 0.4, this.thickness * 0.4);
	    this.tick = this.two.makeRoundedRectangle(this.centerX - this.centerRadius, this.centerY, this.thickness / 2, this.thickness * 1.9, 3);

	    this.background.fill = 'rgb(109, 140, 149)';
	    this.background.noStroke();

	    this.centerCircle.noFill();
	    this.centerCircle.stroke = 'rgb(54, 60, 77)';
	    this.centerCircle.linewidth = this.thickness;

	    this.smallCircle.fill = 'rgb(228, 142, 13)';
	    this.smallCircle.noStroke();

	    this.tick.rotation = Math.PI / 2;
	    this.tick.noStroke();
	    this.tick.fill = 'rgb(81, 191, 222)';

	    this.highScore = parseFloat(this.getCookie('highScore2')) || 0;
	    this.tickAngle = 0;
	    this.points = 0;
	    this.randAngle = 2 * Math.PI * Math.random();
	    this.direction = 1;

	    this.updateScore();

	    this.two.bind('update', function (frameCount) {
	      if (_this.running) {
	        _this.updateGame();
	      }
	    }).play();

	    var ten = 10 * (Math.PI / 180); // ten degrees in radians

	    $(window).on('key-esc', function () {
	      return _this.running = !_this.running;
	    });

	    $(window).on('key-space', function () {
	      if (_this.tick.rotation > _this.smallCircle.rotation - ten && _this.tick.rotation < _this.smallCircle.rotation + ten) {
	        _this.direction *= -1;
	        _this.randAngle += Math.PI * Math.random();
	        _this.randAngle %= 2 * Math.PI;
	        _this.points += 1;
	      } else {
	        _this.points = 0;
	      }

	      _this.updateScore();
	    });
	  }

	  _createClass(Game, [{
	    key: 'updateGame',
	    value: function updateGame() {
	      var tickSpeed = this.points * 0.001;
	      this.tickAngle += (0.05 + tickSpeed) * this.direction;this.tickAngle %= 2 * Math.PI;

	      this.tick.translation.x = this.centerX + this.centerRadius * Math.cos(this.tickAngle);
	      this.tick.translation.y = this.centerY + this.centerRadius * Math.sin(this.tickAngle);
	      this.tick.rotation = Math.PI / 2 + Math.atan2(Math.sin(this.tickAngle), Math.cos(this.tickAngle));

	      this.smallCircle.translation.x = this.centerX + this.centerRadius * Math.cos(this.randAngle);
	      this.smallCircle.translation.y = this.centerY + this.centerRadius * Math.sin(this.randAngle);
	      this.smallCircle.rotation = Math.PI / 2 + Math.atan2(Math.sin(this.randAngle), Math.cos(this.randAngle));
	    }
	  }, {
	    key: 'updateScore',
	    value: function updateScore() {
	      this.highScore = this.highScore > this.points ? this.highScore : this.points;
	      document.getElementById('high-score').innerHTML = 'High Score: ' + this.highScore;
	      document.getElementById('score').innerHTML = this.points;
	      this.setCookie('highScore2', this.highScore, 9999999999999);
	      var instructions = document.getElementById('instructions');
	      if (this.points === 0) instructions.innerHTML = (this.isMobile ? 'tap' : 'press the spacebar') + ' to begin';else instructions.innerHTML = '';
	    }
	  }, {
	    key: 'setCookie',
	    value: function setCookie(cname, cvalue, exdays) {
	      var d = new Date();
	      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	      var expires = "expires=" + d.toUTCString();
	      document.cookie = cname + "=" + cvalue + "; " + expires;
	    }
	  }, {
	    key: 'getCookie',
	    value: function getCookie(cname) {
	      var name = cname + "=";
	      var ca = document.cookie.split(';');
	      for (var i = 0; i < ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) === ' ') {
	          c = c.substring(1);
	        }if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
	      }
	      return "";
	    }
	  }]);

	  return Game;
	}();

	new Game();

/***/ },
/* 1 */
/***/ function(module, exports) {

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

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getCookie = getCookie;
	exports.setCookie = setCookie;
	function getCookie(cname) {
	  var name = cname + "=";
	  var ca = document.cookie.split(';');
	  for (var i = 0; i < ca.length; i++) {
	    var c = ca[i];
	    while (c.charAt(0) === ' ') {
	      c = c.substring(1);
	    }if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
	  }
	  return "";
	}

	// http://www.w3schools.com/js/js_cookies.asp
	function setCookie(cname, cvalue, exdays) {
	  var d = new Date();
	  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	  var expires = "expires=" + d.toUTCString();
	  document.cookie = cname + "=" + cvalue + "; " + expires;
	}

/***/ }
/******/ ]);