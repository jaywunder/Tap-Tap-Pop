//jshint -W117
//jshint -W097
'use strict';

var isMobile = typeof window.orientation !== 'undefined';
window.GAMERUNNING = true;
window.AIPLAYING = false;
window.AIWORKER = null;

// Make an instance of two and place it on the page.
var elem = document.getElementById('draw-shapes');
var params = { width: window.innerWidth, height: window.innerHeight };
var two = new Two(params).appendTo(elem);

var centerRadius = two.height / 8;
var centerX = two.width / 2;
var centerY = two.height / 2;
var thickness = two.height / 20;
console.log(thickness);

var background = two.makeRectangle(centerX, centerY, two.width, two.height);
var centerCircle = two.makeCircle(centerX, centerY, centerRadius);
var smallCircle = two.makeEllipse(centerX - centerRadius, centerY, thickness * 0.4, thickness * 0.4);
var tick = two.makeRoundedRectangle(centerX - centerRadius, centerY, thickness * 0.3, thickness * 2, 3);

background.fill = 'rgb(109, 140, 149)';
background.noStroke();

centerCircle.noFill();
centerCircle.stroke = 'rgb(54, 60, 77)';
centerCircle.linewidth = thickness;

smallCircle.fill = 'rgb(228, 142, 13)';
smallCircle.noStroke();

tick.rotation = Math.PI / 2;
tick.noStroke();
tick.fill = 'rgb(81, 191, 222)';

var highScore = parseInt(getCookie('highScore2')) || 0;
var tickAngle = 0;
var points = 0;
var randAngle = 2 * Math.PI * Math.random();
var direction = 1;

updateScore();

two.bind('update', function (frameCount) {
  if (GAMERUNNING) {
    updateGame();
    updateAIWorker();
  }
}).play();

var ten = 10 * (Math.PI / 180); // ten degrees in radians

$(window).on('key-r', function () {
  document.getElementById('ai-button').onclick();
});

$(window).on('key-esc', function () {
  GAMERUNNING = !GAMERUNNING;
});

$(window).on('key-space', function () {
  if (tick.rotation > smallCircle.rotation - ten && tick.rotation < smallCircle.rotation + ten) {
    direction *= -1;
    randAngle += Math.PI * Math.random();
    randAngle %= 2 * Math.PI;
    points += 1;
  } else {
    points = 0;
  }

  updateScore();
});

var prevMessageTime = 0;

function onAIMessage(event) {
  // console.log('received message from AI worker')
  // console.log(event.timeStamp - prevMessageTime > 350)
  if (event.timeStamp - prevMessageTime > 350) {
    // console.log(event.data);
    $(window).trigger(event.data);
    prevMessageTime = event.timeStamp;
  }
}

function updateAIWorker() {
  if (AIPLAYING) AIWORKER.postMessage([tick.rotation, smallCircle.rotation]);
}

function updateGame() {
  var tickSpeed = points * 0.001;
  tickAngle += (0.05 + tickSpeed) * direction;tickAngle %= 2 * Math.PI;

  tick.translation.x = centerX + centerRadius * Math.cos(tickAngle);
  tick.translation.y = centerY + centerRadius * Math.sin(tickAngle);
  tick.rotation = Math.PI / 2 + Math.atan2(Math.sin(tickAngle), Math.cos(tickAngle));

  smallCircle.translation.x = centerX + centerRadius * Math.cos(randAngle);
  smallCircle.translation.y = centerY + centerRadius * Math.sin(randAngle);
  smallCircle.rotation = Math.PI / 2 + Math.atan2(Math.sin(randAngle), Math.cos(randAngle));
}

function updateScore() {
  highScore = highScore > points ? highScore : points;
  document.getElementById('high-score').innerHTML = 'High Score: ' + highScore;
  document.getElementById('score').innerHTML = points;
  setCookie('highScore2', highScore, 999999);
  var instructions = document.getElementById('instructions');
  if (points === 0) {
    // console.log(isMobile ? 'tap' : 'press the spacebar');
    instructions.innerHTML = (isMobile ? 'tap' : 'press the spacebar') + ' to begin';
  } else instructions.innerHTML = '';
}

var aiButton = document.getElementById('ai-button');
if (aiButton !== null) aiButton.onclick = function () {
  AIPLAYING = !AIPLAYING;

  var button = document.getElementById('ai-button');
  button.innerHTML = 'AI Player: ' + (AIPLAYING ? 'on' : 'off');
  button.setAttribute('state', AIPLAYING ? 'on' : 'off');
  button.blur();

  if (AIPLAYING) {
    AIWORKER = new Worker("./js/ai-player.js");
    AIWORKER.onmessage = onAIMessage;
  } else {
    AIWORKER.terminate();
    AIWORKER = null;
  }
};

// http://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

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
//# sourceMappingURL=main.js.map
