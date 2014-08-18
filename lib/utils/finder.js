'use strict';

var fs = require('fs');

// filter elements without the form euler_(###).(js/coffee)
var filter = function(element) {
  return /euler_\d\d\d.(js|coffee)\b/.test(element);
};

var getList = function(callback, iterator) {
  fs.readdir('.', function(err, list) {
    if (err) {
      console.log(err);
    } else {
      list = list.filter(filter);
      list.sort(function(a, b) {
        return a.localeCompare(b);
      });

      callback && callback(list, iterator);
    }
  });
};

var all = function(list, callback) {
  var number;
  for (var i = 0; i < list.length; i++) {
    number = list[i].slice(6, 9);

    callback(number);
  }
};

var highest = function(list, callback) {
  var highest = list[list.length-1];
  var number = highest.slice(6, 9);

  callback(number);
};

var find = {};

// pass in an iterator
find.allAnd = getList.bind(null, all);

// pass in a callback
find.highestAnd = getList.bind(null, highest);

module.exports = find;