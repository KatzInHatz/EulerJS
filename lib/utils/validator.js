'use strict';

var fs = require('fs');
var coffeescript = require('coffee-script');
var colors = require('colors');

colors.setTheme({
  correct: 'green',
  incorrect: 'red'
});

// retrieve solution data
var fetch = function(verify, callback, number) {
  fs.readFile(__dirname + '/../data/solutions.txt', 'utf8', function(err, data) {
    if (err) {
      // TODO: provide a more accurate error message
      console.log('Solution for prompt ' + number + ' not found.');
    } else {
      verify && verify(data, callback, number);
    }
  });
};

// log correctness to the console
var answer = function(solution, answer, number) {
  console.log('Answer:', answer);

  var message;
  if (answer === solution) {
    console.log(('Congratulations, the answer you gave to problem ' +
                (+number) + ' is correct.').correct);
  } else {
    console.log('Sorry, but the answer you gave appears to be incorrect.'
                .incorrect);
  }
};

// log solution to the console
var solution = function(solution) {
  console.log('Solution:', solution);
};

// eval(coffee-script.compile(euler.coffee))

// verify provided answer against solution
var verify = function(solutions, callback, number) {
  fs.readFile('euler_' + number + '.coffee', 'utf8', function(err, data) {
    if (err) {
      console.log('File euler_' + number + '.coffee not found locally.');
    } else {
      var answer = '' + eval(coffeescript.compile(data));//eval(data);

      // TODO: add better error checking
      var solution = solutions.split('\n')[+number - 1].split('. ')[1];

      callback(solution, answer, number);
    }
  });
};

var validate = {};

validate.answer = fetch.bind(null, verify, answer);

validate.solution = fetch.bind(null, verify, solution);

module.exports = validate;
