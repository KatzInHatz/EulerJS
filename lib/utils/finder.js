'use strict';

var fs = require('fs');


var filter = function(suffix, number, element) {
  suffix = suffix || '(js|coffee)';
  number = number || '\\d\\d\\d';

  return (new RegExp('euler_' + number + '.' + suffix + '\\b')).test(element);
};

var getList = function(filter) {
  var list;

  list = fs.readdirSync('.');
  list = list.filter(filter);
  list.sort(function(a, b) {
    return a.localeCompare(b);
  });

  return list;
};

var find = {};

find.all = function(suffix, number) {
  var list, selector;

  selector = filter.bind(null, suffix, number);
  return getList(selector);
};

find.ifExists = function(success, failure, suffix, number) {
  var exists;
  exists = fs.existsSync('euler_' + number + '.' + suffix);

  if(exists) {
    success();
  } else {
    failure();
  }
  return exists;
};

find.highest = function(success, failure, suffix) {
  var list, number;

  list = this.all(suffix);

  if (list) {
    if (list.length) {
      number = list[list.length-1].slice(6, 9);
      suffix = list[list.length-1].split('.')[1];
    } else {
      number = '000';
      suffix = 'js';
    }
    success && success(number);
  } else {
    failure();
  }
};

module.exports = find;