//jshint -W117
//jshint -W097
'use strict';

function sigmoid(x) {
  return 1 / (1 + Math.pow(Math.E, -x))
}

function sigmoid_output_to_derivative(output) {
  return output * (1 - output)
}

class Matrix {
  constructor(rows, cols) {

    if (typeof rows === 'number' && cols !== undefined) {
      this.rows = rows
      this.cols = cols

      this.matrix = []
      for (let i = 0; i < rows; i++)
        this.matrix.push(new Array(rows))

    } else if (Array.isArray(rows)) {
      let matrix = rows
      this.rows = matrix.length
      this.cols = matrix[0].length

      this.matrix = matrix
    }
    return this
  }

  map(func) {
    return this.matrix.map(func, this)
  }

  mapAll(func) {
    return new Matrix(this.map((y, i) => {
      return y.map((x, j) => {return func(x, i, j)}, this)
    }, this))
  }

  toRandom() {
    this.writeAll((x) => Math.random())
    return this
  }

  toZeros() {
    this.writeAll((x) => { return 0 })
    return this
  }

  toValue(val) {
    this.writeAll((x) => { return val })
    return this
  }

  writeAll(func) {
    for (let y = 0; y < this.matrix.length; y++) {
      for (let x = 0; x < this.matrix[y].length; x++) {
        this.matrix[y][x] = func(this.matrix[y][x], y, x) || this.matrix[y][x]
      }
    }

    return this
  }

  mul(other) {
    if (typeof other == 'number')
      return this.mapAll((value, i, j) => { return value * other })

    else if (other instanceof Matrix) { // STILL UNDER WORK
      if (this.rows === other.cols) {
        let final = new Matrix(this.rows, other.cols)


      } else {
        new Error('Size Error: Matrices aren\'t the same size')
      }
    }
  }

  add(other) {
    if (typeof other == 'number')
      return this.mapAll((value, y, x) => { return value + other })

    else if (other instanceof Matrix) {
      if (other.cols === this.cols && other.rows === this.rows) {
        return this.mapAll((value, y, x) => {
          return value + other.matrix[y][x]
        })
      } else {
        new Error('Size Error: Matrices aren\'t the same size')
      }
    }
  }

  sub(other) {
    if (typeof other == 'number')
      return this.mapAll((value, y, x) => { return value - other })

    else if (other instanceof Matrix) {
      if (other.cols === this.cols && other.rows === this.rows) {
        return this.mapAll((value, y, x) => {
          return value - other.matrix[y][x]
        })
      } else {
        new Error('Size Error: Matrices aren\'t the same size')
      }
    }
  }

  div(other) {
    if (typeof other == 'number')
      return this.mapAll((value, y, x) => { return x / other })
  }

  inv() { // TODO: Inverse method
    if (this.rows === this.cols) {

    }
  }

  toString() {
    return this.matrix.toString()
  }
}
