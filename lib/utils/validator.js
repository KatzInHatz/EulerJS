'use strict';

var fs = require('fs');
var get = require('./getter');
var find = require('./finder');


var validate = {};

validate.one = function(success, failure, suffix, number) {
  var data, answer, solution;

  data = get.data('euler_' + number + '.' + suffix, failure);

  if (data) {
    solution = get.solution(null, failure, number);
    answer = get.answer(data, suffix);
    success(answer, solution, number);
  }
};

validate.all = function(success, failure, suffix) {
  var list, number;

  suffix = suffix || '(js|coffee)';
  list = find.all(suffix, '\\d\\d\\d');

  for (var i = 0; i < list.length; i++) {
    suffix = list[i].split('.')[1];
    number = list[i].slice(6, 9);
    this.one(success, failure, suffix, number);
  }
};

module.exports = validate;
