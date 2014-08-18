'use strict';

var fs = require('fs');
var coffeescript = require('coffee-script');
var colors = require('colors');

colors.setTheme({
  correct: 'green',
  incorrect: 'red'
});

// retrieve solution data
var fetch = function(verify, callback, number, suffix) {
  fs.readFile(__dirname + '/../data/solutions.txt', 'utf8', function(err, data) {
    if (err) {
      // TODO: provide a more accurate error message
      console.log('Solution for prompt ' + number + ' not found.');
    } else {
      verify && verify(data, callback, number, suffix);
    }
  });
};

var processData = function(suffix, data) {
  if (suffix === 'coffee') {
    data = coffeescript.compile(data);
  } else if (suffix === 'js') {
    data = '(function() {\n' + data + '\n}.call(this));';
  }
  return data;
};

// log correctness to the console
var answer = function(solution, suffix, data, number) {
  var answer = '' + eval(processData(suffix, data));//eval(data);
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
var solution = function(solutions, callback, number) {
  // TODO: add better error checking & abstract into helper
  var solution = solutions.split('\n')[+number - 1].split('. ')[1];
  console.log('Solution for ' + number + ':', solution);

  callback && callback(number, solution);
};

// verify provided answer against solution
var verify = function(solutions, callback, number, suffix) {
  fs.readFile('euler_' + number + '.' + suffix, 'utf8', function(err, data) {
    if (err) {
      console.log('File euler_' + number + '.' + suffix + ' not found locally.');
    } else {
      // TODO: add better error checking & abstract into helper
      var solution = solutions.split('\n')[+number - 1].split('. ')[1];

      callback(solution, suffix, data, number);
    }
  });
};

var validate = {};

validate.answer = fetch.bind(null, verify, answer);

validate.solution = fetch.bind(null, solution, null);

module.exports = validate;
