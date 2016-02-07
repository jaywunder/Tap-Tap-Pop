//jshint -W117
//jshint -W097
'use strict';

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

// http://stackoverflow.com/a/10364620
var isMobile = window.matchMedia("only screen and (max-width: 760px)");

var thickness = undefined;
if (isMobile.matches) {
  thickness = two.height / 20;
  console.log('on mobile');
} else {
  thickness = two.width / 50;
  console.log('on computer');
}

thickness = two.height / 20;
console.log(thickness);

var background = two.makeRectangle(centerX, centerY, two.width, two.height);
var centerCircle = two.makeCircle(centerX, centerY, centerRadius);
var smallCircle = two.makeEllipse(centerX - centerRadius, centerY, thickness * 0.4, thickness * 0.4);
var tick = two.makeRoundedRectangle(centerX - centerRadius, centerY, thickness / 2, thickness * 1.9, 3);

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

var highScore = 0;
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
  tickAngle += 0.05 * direction;tickAngle %= 2 * Math.PI;

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
  var instructions = document.getElementById('instructions');
  if (points === 0) instructions.innerHTML = (isMobile.matches ? 'tap' : 'press the spacebar') + ' to begin';else instructions.innerHTML = '';
}

document.getElementById('ai-button').onclick = function () {
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
//# sourceMappingURL=main.js.map
