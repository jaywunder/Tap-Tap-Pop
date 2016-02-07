//jshint -W117
//jshint -W097
'use strict';

self.importScripts('./num.js');

var alpha = 0.1;
var input_dim = 2;
var hidden_dim = 16;
var output_dim = 1;

var synapse_0 = new Matrix(input_dim, hidden_dim).toRandom().mul(2).sub(1);
var synapse_1 = new Matrix(hidden_dim, output_dim).toRandom().mul(2).sub(1);
var synapse_h = new Matrix(hidden_dim, hidden_dim).toRandom().mul(2).sub(1);

var synapse_0_update = new Matrix(input_dim, hidden_dim).toValue(0);
var synapse_1_update = new Matrix(hidden_dim, output_dim).toValue(0);
var synapse_h_update = new Matrix(hidden_dim, hidden_dim).toValue(0);

var overallError = 0;

var ten = 10 * (Math.PI / 180); // ten degrees in radians

onmessage = function onmessage(event) {
  var angle0 = event.data[0];
  var angle1 = event.data[1];

  // RULES ENGINE TO ALWAYS GET THE ANGLES RIGHT
  // if (angle0 > angle1 - ten && angle0 < angle1 + ten)
  //   postMessage('key-space')

  var layer_2_deltas = [];
  var layer_1_values = [];
  layer_1_values.push(new Matrix(hidden_dim, 1).toZeros());
};
//# sourceMappingURL=ai-player.js.map
