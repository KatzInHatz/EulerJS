'use strict';

var fs = require('fs');
var find = require('./finder');


var marks = {
  coffee: '#',
  js: '//'
};

var getPrompt = function(callback, comment, suffix, number, data) {
  var prompt = data.split('\n\n\n')[+number - 1]; // remove leading zeros
  var mark = marks[suffix];
  var output;

  if (comment) {
    output = mark + '\t' + prompt.split('\n').join('\n' + mark + '\t') +
            '\n\n\n\n' + mark + '\tTODO: return your answer for this prompt.';
  } else {
    output = prompt;
  }

  callback && callback(output, suffix, number);
};

// split problems.txt and generate specified prompt
var output = function(callback, comment, suffix, number) {
  fs.readFile(__dirname + '/../data/problems.txt', 'utf8', function(err, data) {
    if (err) throw err;

    if (number) {
      getPrompt(callback, comment, suffix, number, data);
    } else {
      find.highestAnd(function(number) {
        // add leading zeros for file path
        var padding = '000';
        number = (padding + (+number + 1)).slice(-padding.length);
        getPrompt(callback, comment, suffix, number, data);
      });
    }
  });
};

// TODO: use buffers to read and write simultaneously
var copy = function(path, resource) {
  fs.readFile(path, function(err, data) {
    if (err) throw err;

    fs.writeFile(resource, data, function(err) {
      if (err) throw err;

      console.log('successfully generated ' + resource);
    });
  });
};

// write specified prompt to file in current directory
var write = function(output, suffix, number) {
  fs.readFile(__dirname + '/../data/resources.json', 'utf8', function(err, data) {
    if (err) throw err;

    var resources = JSON.parse(data)[+number]; // resources can be undefined, a string or an array of strings

    fs.writeFile('euler_' + number + '.' + suffix, output, function(err) {
      if (err) throw err;

      console.log('successfully generated euler_' + number + '.' + suffix);
    });

    if (resources !== undefined) {
      if (Array.isArray(resources)) {
        for (var i = 0; i < resources.length; i++) {
          copy(__dirname + '/../data/resources/' + resources[i], resources[i]);
        }
      } else {
        copy(__dirname + '/../data/resources/' + resources, resources);
      }
    }
  });
};

// log specified prompt preview to the command line
var print = function(output) {
  console.log(output);
};

// generate functions accept a three digit number as a string
// TODO: add a -c --coffee option
var generate = {};

generate.preview = output.bind(null, print, false);

generate.file = output.bind(null, write, true);

module.exports = generate;
