'use strict';

var fs = require('fs');

// split problems.txt and generate specified prompt
var output = function(callback, comment, number) {
  fs.readFile(__dirname + '/../problems.txt', 'utf8', function(err, data) {
    if (err) throw err;
    var prompt = data.split('\n\n\n')[+number]; // remove leading zeros
    var output = comment ? '//\t' + prompt.split('\n').join('\n//\t') : prompt;

    callback && callback(output, number);
  });
};

// write specified prompt to file in current directory
var write = function(output, number) {
  fs.writeFile('euler_' + number + '.js', output, function(err) {
    if (err) throw err;

    console.log('successfully generated euler_' + number + '.js');
  });
};

// log specified prompt preview to the command line
var print = function(output) {
  console.log(output);
};

var generate = {};

generate.preview = output.bind(null, print, false);

generate.file = output.bind(null, write, true);

module.exports = generate;
