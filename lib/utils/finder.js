'use strict';

var fs = require('fs');


var filter = function(number, suffix, element) {
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

find.all = function(number, suffix) {
  var list, selector;

  selector = filter.bind(null, number, suffix);
  return getList(selector);
};

find.ifExists = function(success, failure, number, suffix) {
  var list;
  list = this.all(number, suffix);

  if (list) {
    list.length ? success() : failure();
  } else {
    failure();
  }
};

find.highest = function(success, failure, number, suffix) {
  var list;

  suffix = suffix || '(js|coffee)';
  list = this.all('\\d\\d\\d', suffix);

  if (list) {
    if (list.length) {
      number = list[list.length-1].slice(6, 9);
      suffix = list[list.length-1].split('.')[1];
    } else {
      number = '000';
      suffix = 'js';
    }
    success(number, suffix);
  } else {
    failure();
  }
};

module.exports = find;