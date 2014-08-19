'use strict';

var fs = require('fs');

// filter elements without the form euler_(###).(js/coffee)
var filter = function(element) {
  return /euler_\d\d\d.(js|coffee)\b/.test(element);
};

var selector = function(number, suffix, element) {
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

var all = function(list, callback, num, error, end) {
  var number, suffix;
  for (var i = 0; i < list.length; i++) {
    number = list[i].slice(6, 9);
    suffix = list[i].split('.')[1];
    if (number === num && suffix === end) error();

    callback(number, suffix);
  }
};

var find = {};

find.ifExists = function(success, failure, number, suffix) {
  var list, filter;

  filter = selector.bind(null, number, suffix);
  list = getList(filter);

  if (list) {
    list.length ? success() : failure();
  } else {
    failure();
  }
};

find.highest = function(success, failure, number, suffix) {
  var list, selector;

  suffix = suffix || '(js|coffee)';
  selector = filter.bind(null, '\d\d\d', suffix);
  list = getList(filter);
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

find.allAnd = getList.bind(null, all, filter);



find.numberAnd = getList.bind(null, all, selector);

module.exports = find;