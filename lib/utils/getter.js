'use strict';

var fs = require('fs');
var coffeescript = require('coffee-script');

var get = {};

get.data = function(path, failure) {
  var data;
  try {
    data = fs.readFileSync(path, 'utf8');
  } catch (error) {
    failure();
  }
  
  return data;
};

get.solution = function(success, failure, number) {
  var solutions, solution;
  solutions = this.data(__dirname + '/../data/solutions.txt', failure);
  if (solutions) {
    solution = solutions.split('\n')[+number - 1];

    if (solution) {
      solution = solution.split('. ')[1];
      success && success(solution);
    } else {
      failure && failure();
    }
  }

  return solution;
};

get.answer = function(data, suffix) {
  var start, end, result;

  if (suffix === 'coffee') {
    data = coffeescript.compile(data);
  } else if (suffix === 'js') {
    data = '(function() {\n' + data + '\n}.call(this));';
  }

  start = new Date();
  result = '' + eval(data);
  end = (new Date() - start) + 'ms';

  return [result, end];
};


module.exports = get;