'use strict';

var fs = require('fs');

var fetch = function(number, callback) {
  fs.readFile(__dirname + '/../data/solutions.txt', 'utf8', function(err, data) {
    if (err) {
      console.log('Solution for prompt ' + number + ' not found.');
    } else {
      callback && callback.call(null, number, data);
    }
  });
};

var message = function(number, correct) {
  var message = '%c';
  var color = 'color: ';
  if (correct) {
    message += 'Congratulations, the answer you gave to problem ' + (+number) + 
               ' is correct.';
    color += 'green';
  } else {
    message += 'Sorry, but the answer you gave appears to be incorrect.';
    color += 'red';
  }

  console.log(message, color);
};

var verify = function(number, solutions) {
  fs.readFile('euler_' + number + '.js', 'utf8', function(err, data) {
    if (err) {
      console.log('File euler_' + number + '.js not found locally.');
    } else {
      var answer = '' + eval(data);
      var solution = solutions.split('\n')[+number - 1].split('. ')[1];

      console.log('Answer:', answer);
      message(number, answer === solution);
    }
  });
};

var solution = function(number) {
  fetch(number, verify);
};

var validate = {};

validate.solution = solution;

module.exports = validate;
