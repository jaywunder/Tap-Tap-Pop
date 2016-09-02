//jshint -W117
//jshint -W097
'use strict';

// require('../lib/jquery-2.2.0.min.js')
// require('../lib/two.min.js')
require('./keybindings.js')
// require('./util.js')

import * as d3 from "d3"
import * as utils from './util.js';

class Game {
  constructor() {
    this.isMobile = typeof window.orientation !== 'undefined'
    this.running = true

    // Make an instance of two and place it on the page.
    this.elem = document.getElementById('draw-shapes')
    this.params = { width: window.innerWidth, height: window.innerHeight }
    this.two = new Two(this.params).appendTo(this.elem)

    this.centerRadius = this.two.height / 8
    this.centerX = this.two.width / 2
    this.centerY = this.two.height / 2
    this.thickness = this.two.height / 20

    this.background = this.two.makeRectangle(this.centerX, this.centerY, this.two.width, this.two.height)
    this.centerCircle = this.two.makeCircle(this.centerX, this.centerY,  this.centerRadius)
    this.smallCircle = this.two.makeEllipse(
      this.centerX - this.centerRadius, this.centerY,
      this.thickness * 0.4, this.thickness * 0.4
    )
    this.tick = this.two.makeRoundedRectangle(
      this.centerX - this.centerRadius, this.centerY,
      this.thickness / 2, this.thickness * 1.9, 3
    )

    this.background.fill = 'rgb(109, 140, 149)'
    this.background.noStroke()

    this.centerCircle.noFill()
    this.centerCircle.stroke = 'rgb(54, 60, 77)'
    this.centerCircle.linewidth = this.thickness

    this.smallCircle.fill = 'rgb(228, 142, 13)'
    this.smallCircle.noStroke()

    this.tick.rotation = Math.PI / 2
    this.tick.noStroke()
    this.tick.fill = 'rgb(81, 191, 222)'

    this.highScore = parseFloat(this.getCookie('highScore2')) || 0
    this.tickAngle = 0
    this.points = 0
    this.randAngle = 2 * Math.PI * Math.random()
    this.direction = 1

    this.updateScore()

    this.two.bind('update', (frameCount) => {
      if (this.running) {
        this.updateGame()
      }
    }).play()

    let ten = (10 * (Math.PI / 180)) // ten degrees in radians

    $(window).on('key-esc', () => this.running = !this.running )

    $(window).on('key-space', () => {
      if (this.tick.rotation > this.smallCircle.rotation - ten &&
          this.tick.rotation < this.smallCircle.rotation + ten) {
        this.direction *= -1
        this.randAngle += Math.PI * Math.random()
        this.randAngle %= 2 * Math.PI
        this.points += 1
      } else {
        this.points = 0
      }

      this.updateScore()
    })
  }

  updateGame() {
    let tickSpeed = this.points * 0.001
    this.tickAngle += (0.05 + tickSpeed) * this.direction; this.tickAngle %= 2 * Math.PI

    this.tick.translation.x = this.centerX + (this.centerRadius * Math.cos(this.tickAngle))
    this.tick.translation.y = this.centerY + (this.centerRadius * Math.sin(this.tickAngle))
    this.tick.rotation = (Math.PI / 2) + Math.atan2(
      Math.sin(this.tickAngle),
      Math.cos(this.tickAngle)
    )

    this.smallCircle.translation.x = this.centerX + (this.centerRadius * Math.cos(this.randAngle))
    this.smallCircle.translation.y = this.centerY + (this.centerRadius * Math.sin(this.randAngle))
    this.smallCircle.rotation = (Math.PI / 2) + Math.atan2(
      Math.sin(this.randAngle),
      Math.cos(this.randAngle)
    )
  }

  updateScore() {
    this.highScore = (this.highScore > this.points ? this.highScore : this.points)
    document.getElementById('high-score').innerHTML = 'High Score: ' + this.highScore
    document.getElementById('score').innerHTML = this.points
    this.setCookie('highScore2', this.highScore, 9999999999999)
    let instructions = document.getElementById('instructions')
    if (this.points === 0)
      instructions.innerHTML = `${ this.isMobile ? 'tap' : 'press the spacebar'} to begin`
    else
      instructions.innerHTML = ''
  }

  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }

  getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length,c.length);
    }
    return "";
  }
}

new Game()
