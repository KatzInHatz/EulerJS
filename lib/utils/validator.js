'use strict';

var fs = require('fs');
var colors = require('colors');

colors.setTheme({
  correct: 'green',
  incorrect: 'red'
});

// retrieve solution data
var fetch = function(number, callback) {
  fs.readFile(__dirname + '/../data/solutions.txt', 'utf8', function(err, data) {
    if (err) {
      // TODO: provide a more accurate error message
      console.log('Solution for prompt ' + number + ' not found.');
    } else {
      callback && callback.call(null, number, data);
    }
  });
};

// produce message to be logged to the console
var message = function(number, correct) {
  if (correct) {
    console.log(('Congratulations, the answer you gave to problem ' + (+number) + 
               ' is correct.').correct);
  } else {
    console.log('Sorry, but the answer you gave appears to be incorrect.'.incorrect);
  }

};

// verify provided answer against solution
var verify = function(number, solutions) {
  fs.readFile('euler_' + number + '.js', 'utf8', function(err, data) {
    if (err) {
      console.log('File euler_' + number + '.js not found locally.');
    } else {
      var answer = '' + eval(data);

      // TODO: add better error checking
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
