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

var copy = function(from, to, failure) {
  try {
    fs.createReadStream(from + to).pipe(fs.createWriteStream(to));
  } catch (error) {
    console.log(error);
    failure();
  }
};

var write = function(success, failure, number, suffix, prompt) {
  var file, data, resources, i;

  try {
    // write current prompt
    file = 'euler_' + number + '.' + suffix;
    fs.writeFileSync(file, prompt, 'utf8');
    console.log('successfully generated ' + file + '.');

    // if any resources exist, write them also
    resources = getData(__dirname + '/../data/resources.json', failure);
    resources = JSON.parse(resources)[+number];
    if (resources) {
      if (Array.isArray(resources)) {
        for (i = 0; i < resources.length; i++) {
          copy(__dirname + '/../data/resources/', resources[i], failure);
          console.log('successfully generated ' + resources[i] + '.');
        }
      } else {
        copy(__dirname + '/../data/resources/', resources, failure);
        console.log('successfully generated ' + resources + '.');
      }
    }

    success();
  } catch (error) {
    console.log(error);
    failure();
  }
};

var getData = function(path, failure) {
  var data;
  try {
    data = fs.readFileSync(path, 'utf8');
  } catch (error) {
    console.log(error);
    failure();
  }
  return data;
};

var generateOutput = function(success, failure, number, suffix) {
  var data, prompt;

  number = number ? number : find.highestAnd();
  data = getData(__dirname + '/../data/problems.txt', failure, number);
  if (data) {
    prompt = getPrompt(data, number, suffix);
    success(prompt);
  }
};

var generate = {};

generate.preview = function(success, failure, number) {
  generateOutput(success, failure, number);
};

generate.file = function(success, failure, number, suffix) {
  var writer;
  writer = write.bind(null, success, failure, number, suffix);
  generateOutput(writer, failure, number, suffix);
};

module.exports = generate;
