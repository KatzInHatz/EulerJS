'use strict';

var fs = require('fs');

// filter elements without the form euler_(###).(js/coffee)
var filter = function(element) {
  return /euler_\d\d\d.(js|coffee)\b/.test(element);
};

var selector = function(number, element) {
  return (new RegExp('euler_' + number + '.(js|coffee)\\b')).test(element);
};

var getList = function(callback, filter, iterator, number, error, suffix) {
  fs.readdir('.', function(err, list) {
    if (err) {
      console.log(err);
    } else {
      list = list.filter(filter.bind(null, number));
      list.sort(function(a, b) {
        return a.localeCompare(b);
      });

      callback && callback(list, iterator, number, error, suffix);
    }
  });
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

var highest = function(list, callback) {
  var number = list.length ? list[list.length-1].slice(6, 9) : '000';

  callback(number);
};

var find = {};

// pass in an iterator
find.allAnd = getList.bind(null, all, filter);

// pass in a callback
find.highestAnd = getList.bind(null, highest, filter);

find.numberAnd = getList.bind(null, all, selector);

module.exports = find;