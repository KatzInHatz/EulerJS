'use strict';

var fs = require('fs');
var coffeescript = require('coffee-script');

var get = {};

get.data = function(path, failure) {
  var data;
  try {
    data = fs.readFileSync(path, 'utf8');
  } catch (error) {
    console.log(error);
    failure();
  }
  return data;
};

get.solution = function(success, failure, number) {
  var solutions, solution;
  solutions = this.data(__dirname + '/../data/solutions.txt', failure);
  if (solutions) {
    solution = solutions.split('\n')[+number - 1].split('. ')[1];

    if (success) {
      success(solution);
    }
  }

  return solution;
};

get.answer = function(data, suffix) {
  if (suffix === 'coffee') {
    data = coffeescript.compile(data);
  } else if (suffix === 'js') {
    data = '(function() {\n' + data + '\n}.call(this));';
  }
  
  // TODO: calculate runtime
  return '' + eval(data);
};


module.exports = get;