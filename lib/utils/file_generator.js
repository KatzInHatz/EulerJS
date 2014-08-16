'use strict';

var fs = require('fs');

// split problems.txt and generate specified prompt
// TODO: implement without array (running out of space)
var output = function(callback, comment, number) {
  fs.readFile(__dirname + '/../data/problems.txt', 'utf8', function(err, data) {
    if (err) throw err;
    var prompt = data.split('\n\n\n')[+number]; // remove leading zeros
    var output = comment ? '//\t' + prompt.split('\n').join('\n//\t') : prompt;

    callback && callback(output, number);
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
var write = function(output, number) {
  fs.readFile(__dirname + '/../data/resources.json', 'utf8', function(err, data) {
    if (err) throw err;

    var resources = JSON.parse(data)[+number]; // resources can be undefined, a string or an array of strings

    fs.writeFile('euler_' + number + '.js', output, function(err) {
      if (err) throw err;

      console.log('successfully generated euler_' + number + '.js');
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
