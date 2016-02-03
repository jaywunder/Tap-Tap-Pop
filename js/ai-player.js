//jshint -W117
//jshint -W097
'use strict';

self.importScripts('./num.js')

let alpha = 0.1
let input_dim = 2
let hidden_dim = 16
let output_dim = 1

let synapse_0 = new Matrix(input_dim, hidden_dim).toRandom().mul(2).sub(1)
let synapse_1 = new Matrix(hidden_dim, output_dim).toRandom().mul(2).sub(1)
let synapse_h = new Matrix(hidden_dim, hidden_dim).toRandom().mul(2).sub(1)

let synapse_0_update = new Matrix(input_dim, hidden_dim).toValue(0)
let synapse_1_update = new Matrix(hidden_dim, output_dim).toValue(0)
let synapse_h_update = new Matrix(hidden_dim, hidden_dim).toValue(0)

let overallError = 0

let ten = (10 * (Math.PI / 180)) // ten degrees in radians

onmessage = function(event) {
  let angle0 = event.data[0]
  let angle1 = event.data[1]


  // RULES ENGINE TO ALWAYS GET THE ANGLES RIGHT
  // if (angle0 > angle1 - ten && angle0 < angle1 + ten)
  //   postMessage('key-space')


  let layer_2_deltas = []
  let layer_1_values = []
  layer_1_values.push(new Matrix(hidden_dim, 1).toZeros())
}
