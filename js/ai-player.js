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

let layer_2_deltas = []
let layer_1_values = []
layer_1_values.push(new Matrix(hidden_dim, 1).toValue(0))

let overallError = 0

let ten = (10 * (Math.PI / 180)) // ten degrees in radians

onmessage = function(e) {
  let data = e.data
  // console.log('data:', data[0].toFixed(1), data[1].toFixed(1));
  // if (data[0].toFixed(1) === data[1].toFixed(1))

  if (data[0] > data[1] - ten &&
      data[0] < data[1] + ten)
    postMessage('key-space')

  let angle0 = data[0]
  let angle1 = data[1]


}
