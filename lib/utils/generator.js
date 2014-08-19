'use strict';

var fs = require('fs');
var find = require('./finder');


var marks = {
  coffee: '#',
  js: '//'
};

var getPrompt = function(data, number, suffix) {
  var prompt, mark, output;
  prompt = data.split('\n\n\n')[+number - 1]; // remove leading zeros
  mark = marks[suffix];

  if (suffix) {
    prompt = mark + ' ' + prompt.split('\n').join('\n' + mark + ' ') +
            '\n\n\n\n' + mark + ' TODO: return your answer for this prompt.' +
            '\nreturn solution';
    if (suffix === 'js') prompt += ';';
    prompt += '\n';
  }

  return prompt;
};

// TODO: handle errors & success callback
var copy = function(from, to) {
  fs.createReadStream(from + to).pipe(fs.createWriteStream(to));
};

var write = function(success, failure, number, suffix, prompt) {
  var file, data, resources;

  // write current prompt
  file = 'euler_' + number + '.' + suffix;
  data = fs.writeFileSync(file, prompt);

  // write all resources
  if (data) {
    resources = getData(__dirname + '/../data/resources.json', failure);
    if (resources) {
      resources = JSON.parse(resources)[+number]; // resources can be undefined, a string or an array of strings
  
      if (Array.isArray(resources)) {
        for (var i = 0; i < resources.length; i++) {
          copy(__dirname + '/../data/resources/', resources[i]);
        }
      } else {
        copy(__dirname + '/../data/resources/', resources);
      }
    }
  }
};

var getData = function(path, failure, number) {
  var data;
  try {
    data = fs.readFileSync(path, 'utf8');
  } catch (error) {
    failure(path);
  }
  return data;
};

var generatePreview = function(success, failure, number) {
  generateOutput(success, failure, number);
};

var generateFile = function(success, failure, number, suffix) {
  write = write.bind(null, success, failure, number, suffix);
  generateOutput(write, failure, number, suffix);
};

var generateOutput = function(success, failure, number, suffix) {
  var data, prompt;

  number = number ? number : find.highestAnd();
  data = getData(__dirname + '/../data/problems.txt', failure, number);
  if (data) {
    prompt = getPrompt(data, number, suffix);
    success && success(prompt, number, suffix);
  }
};

var generate = {};

generate.preview = generatePreview;

generate.file = generateFile;

module.exports = generate;
