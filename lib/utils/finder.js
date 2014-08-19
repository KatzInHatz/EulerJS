'use strict';

var fs = require('fs');


var filter = function(suffix, number, element) {
  return (new RegExp('euler_' + number + '.' + suffix + '\\b')).test(element);
};

var getList = function(filter) {
  var list;

  try {
    list = fs.readdirSync('.');
    list = list.filter(filter);
    list.sort(function(a, b) {
      return a.localeCompare(b);
    });
  } catch (error) {
    console.log(error);
  }

  return list;
};

var find = {};

find.all = function(suffix, number) {
  var list, selector;

  selector = filter.bind(null, suffix, number);
  return getList(selector);
};

find.ifExists = function(success, failure, suffix, number) {
  var list;
  list = this.all(suffix, number);

  if (list) {
    list.length ? success() : failure();
  } else {
    failure();
  }
};

find.highest = function(success, failure, suffix) {
  var list, number;

  suffix = suffix || '(js|coffee)';
  list = this.all(suffix, '\\d\\d\\d');

  if (list) {
    if (list.length) {
      number = list[list.length-1].slice(6, 9);
      suffix = list[list.length-1].split('.')[1];
    } else {
      number = '000';
      suffix = 'js';
    }
    success(number);
  } else {
    failure();
  }
};

module.exports = find;