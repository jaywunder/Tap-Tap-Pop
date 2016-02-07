//jshint -W117
//jshint -W097
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function sigmoid(x) {
  return 1 / (1 + Math.pow(Math.E, -x));
}

function sigmoid_output_to_derivative(output) {
  return output * (1 - output);
}

var Matrix = function () {
  function Matrix(rows, cols) {
    _classCallCheck(this, Matrix);

    if (typeof rows === 'number' && cols !== undefined) {
      this.rows = rows;
      this.cols = cols;

      this.matrix = [];
      for (var i = 0; i < rows; i++) {
        this.matrix.push(new Array(rows));
      }
    } else if (Array.isArray(rows)) {
      var matrix = rows;
      this.rows = matrix.length;
      this.cols = matrix[0].length;

      this.matrix = matrix;
    }
    return this;
  }

  _createClass(Matrix, [{
    key: 'map',
    value: function map(func) {
      return this.matrix.map(func, this);
    }
  }, {
    key: 'mapAll',
    value: function mapAll(func) {
      var _this = this;

      return new Matrix(this.map(function (y, i) {
        return y.map(function (x, j) {
          return func(x, i, j);
        }, _this);
      }, this));
    }
  }, {
    key: 'toRandom',
    value: function toRandom() {
      this.writeAll(function (x) {
        return Math.random();
      });
      return this;
    }
  }, {
    key: 'toZeros',
    value: function toZeros() {
      // jshint -W053
      // here I use "new Number" because 0 is type inferenced into undefined
      this.writeAll(function (x) {
        return new Number(0);
      });
      return this;
    }
  }, {
    key: 'toValue',
    value: function toValue(val) {
      // jshint -W053
      // here I use "new Number" because 0 is type inferenced into undefined
      this.writeAll(function (x) {
        return new Number(val);
      });
      return this;
    }
  }, {
    key: 'toString',
    value: function toString() {
      var str = '';

      str = str + this.map(function (x) {
        return '[' + x.toString() + ']';
      });

      return str;
    }
  }, {
    key: 'writeAll',
    value: function writeAll(func) {
      for (var y = 0; y < this.matrix.length; y++) {
        for (var x = 0; x < this.matrix[y].length; x++) {
          this.matrix[y][x] = func(this.matrix[y][x], y, x) || this.matrix[y][x];
        }
      }

      return this;
    }
  }, {
    key: 'mul',
    value: function mul(other) {
      var _this2 = this;

      if (typeof other == 'number') return this.mapAll(function (value, i, j) {
        return value * other;
      });else if (other instanceof Matrix) {
        if (this.rows === other.cols) {
          var final = new Matrix(this.rows, other.cols);

          for (var row = 0; row < this.rows; row++) {
            var _loop = function _loop(col) {
              var rowTotal = 0;
              _this2.matrix[row].map(function (x, i) {
                rowTotal += x * other.matrix[i][col];
              });

              final.matrix[row][col] = rowTotal;
            };

            for (var col = 0; col < other.cols; col++) {
              _loop(col);
            }
          }
          return final;
        } else {
          new Error('Size Error: Rows of A don\'t match the Columns of B');
        }
      }
    }
  }, {
    key: 'add',
    value: function add(other) {
      if (typeof other == 'number') return this.mapAll(function (value, y, x) {
        return value + other;
      });else if (other instanceof Matrix) {
        if (other.cols === this.cols && other.rows === this.rows) {
          return this.mapAll(function (value, y, x) {
            return value + other.matrix[y][x];
          });
        } else {
          new Error('Size Error: Matrices aren\'t the same size');
        }
      }
    }
  }, {
    key: 'sub',
    value: function sub(other) {
      if (typeof other == 'number') return this.mapAll(function (value, y, x) {
        return value - other;
      });else if (other instanceof Matrix) {
        if (other.cols === this.cols && other.rows === this.rows) {
          return this.mapAll(function (value, y, x) {
            return value - other.matrix[y][x];
          });
        } else {
          new Error('Size Error: Matrices aren\'t the same size');
        }
      }
    }
  }, {
    key: 'div',
    value: function div(other) {
      if (typeof other == 'number') return this.mapAll(function (value, y, x) {
        return x / other;
      });
    }
  }, {
    key: 'inv',
    value: function inv() {
      // TODO: Inverse method
      if (this.rows === this.cols) {}
    }
  }]);

  return Matrix;
}();

var ctx = typeof window === 'undefined' ? self : window;
ctx.num = {};
num.sigmoid = sigmoid;
num.sigmoid_output_to_derivative = sigmoid_output_to_derivative;
num.Matrix = Matrix;
//# sourceMappingURL=num.js.map
