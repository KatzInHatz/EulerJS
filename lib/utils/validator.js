'use strict';

var fs = require('fs');
var get = require('./getter');
var find = require('./utils/finder');


var validate = {};

validate.one = function(success, failure, suffix, number) {
  var data;

  data = get.data('euler_' + number + '.' + suffix, failure);

  if (data) {
    get.solution(success, failure, number);
    get.answer(data, suffix);
    success(answer, solution);
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
