//jshint -W117
//jshint -W097
'use strict';

import * as d3 from 'd3'
import { getCookie, setCookie } from './util.js';

const NOCOLOR  = 'rgba(0, 0, 0, 0)'

// const GREYBLUE = 'rgb(54, 60, 77)'
// const ORANGE   = 'rgb(228, 142, 13)'
// const AQUA     = 'rgb(81, 191, 222)'

const GREY     = '#E8E8EA'
const YELLOW   = '#F0C034'
const GREEN    = '#54BA75'
const RED      = '#C83D34'
const DARKBLUE = '#234B6E'

class Game {
  constructor() {
    this.isMobile = typeof window.orientation !== 'undefined'
    this.running = true
    this.highScore = parseFloat(getCookie('highScore2')) || 0
    this.tickAngle = 0
    this.targetAngle = 360 * Math.random()
    this._points = 0
    this.direction = 1
    this._misses = 0
    this.willMiss = false
    this.colorQueue = []
    this.isTransitioning = false

    this.container = d3.select('body')
      .append('svg')
      .attr('id', 'draw-shapes')
      .attr('width', window.innerWidth)
      .attr('height', window.innerHeight)
      .style('background-color', GREY)

    this.shapeContainer = this.container
      .append('g')
      .attr('transform', `translate(${ this.centerX }, ${ this.centerY })`)

    this.centerShape = this.shapeContainer
      .append('circle')
      .attr('r', this.centerRadius)
      .attr('fill', NOCOLOR)
      .style('stroke', GREEN)
      .style('stroke-width', this.thickness)

    this.targetCircle = this.shapeContainer
      .append('circle')
      .attr('cy', this.centerRadius)
      .attr('r', this.thickness / 2.5)
      .attr('fill', GREY)
      .attr('transition-timing-function', 'ease-in-out')

    this.tick = this.shapeContainer
      .append('rect')
      .attr('x', -this.centerRadius / 20)
      .attr('y', this.centerRadius - this.thickness * 1.2)
      .attr('width', this.centerRadius / 10)
      .attr('height', this.thickness * 2.4)
      .attr('fill', DARKBLUE)
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('transition-timing-function', 'linear')

    this.updateScore()
    this.moveTargetCircle()
    this.updateGame()

    window.addEventListener('keydown', (event) => {
      switch (event.which) {
        case 32: // space key
          this.onSpaceBar(); break
        case 27: // esc
          this.running = !this.running; break
      }
    })
  }

  onSpaceBar() {
    if (this.tickOverLapsCircle()) {
      this.points++
      this.willMiss = false
      this.misses = 0
      this.direction *= -1
      this.targetAngle += (90 + 180 * Math.random()) * -this.direction
      if (this.targetAngle < 0)
        this.targetAngle = 360 + this.targetAngle
      this.targetAngle %= 360
      this.moveTargetCircle()
    } else {
      this.misses = 0
      this.points = 0
    }

    this.updateScore()
  }

  moveTargetCircle() {
    this.targetCircle
      .transition()
      .attr('transform', `rotate(${ this.targetAngle })`)
      .duration(500)
  }

  tickOverLapsCircle() {
    return (
      Math.abs(this.tickAngle) > this.targetAngle - 10 &&
      Math.abs(this.tickAngle) < this.targetAngle + 10
    )
  }

  updateGame() {
    setTimeout(this.updateGame.bind(this), 16)

    if ( this.running ) {
      let tickSpeed = (3 + this.points * 0.1) * this.direction
      if (this.tickAngle + tickSpeed > 0){
        this.tickAngle += tickSpeed
      } else {
        this.tickAngle = 360 + tickSpeed
      }

      this.tickAngle %= 360

      if (this.tickOverLapsCircle()) this.willMiss = true

      if (this.willMiss && !this.tickOverLapsCircle()) {
        this.misses++
        this.willMiss = false
      }

      if (this.colorQueue.length > 0 && !this.isTransitioning) {
        this.isTransitioning = true
        this.centerShape
          .transition()
          .style('stroke', this.colorQueue[0])
          .duration(300)
          .on('end', () => {
            this.isTransitioning = false
            this.colorQueue.splice(0, 1)
          })
      }

      this.tick
        .transition()
        .attr('transform', `rotate(${ this.tickAngle })`)
        .duration(15)
    }
  }

  updateScore() {
    this.highScore = (this.highScore > this.points ? this.highScore : this.points)
    document.getElementById('high-score').innerHTML = 'High Score: ' + this.highScore
    document.getElementById('score').innerHTML = this.points
    setCookie('highScore2', this.highScore, 9999999999999)
    let instructions = document.getElementById('instructions')
    if (this.points === 0)
      instructions.innerHTML = `${ this.isMobile ? 'tap' : 'press the spacebar'} to begin`
    else
      instructions.innerHTML = ''
  }

  get centerRadius() {
    return window.innerHeight < window.innerWidth
      ? window.innerHeight / 6
      : window.innerWidth  / 6
  }
  get centerX() { return window.innerWidth / 2 }
  get centerY() { return window.innerHeight / 2 }
  get thickness() { return this.centerRadius / 2.5 }

  set points(val) {
    this._points = val
  }

  get points() {
    return this._points
  }

  set centerShapeColor(val) {
    this.colorQueue.push(val)
  }

  set misses(val) {
    if (this.points === 0) {
      this.centerShapeColor = GREEN
      return
    }

    this._misses = val

    if (this._misses === 0)
      this.centerShapeColor = GREEN

    else if (this._misses === 1)
      this.centerShapeColor = YELLOW

    else if (this._misses === 2)
      this.centerShapeColor = RED

    else if (this._misses >= 3) {
      if (this.points - 1 < 0)
        this.centerShapeColor = GREEN
      else
        this.points--

      this.updateScore()
    }
  }

  get misses() {
    return this._misses
  }
}

new Game()
