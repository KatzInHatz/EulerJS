'use strict';

var fs = require('fs');

// var number = element.split('euler_')[1].slice(0, 3);

// filter elements without the form euler_(###).(js/coffee)
var filter = function(element) {
  return /euler_\d\d\d.(js|coffee)\b/.test(element);
};

var getAll = function(callback) {
  fs.readdir('.', function(err, list) {
    if (err) {
      console.log(err);
    } else {
      list = list.filter(filter);
      list.sort(function(a, b) {
        return a.localeCompare(b);
      });

      callback && callback(list);
    }
  });
};

var find = {};

// pass in an iterator
find.all = getAll;

// pass in a callback
find.highest = 0;

module.exports = find;