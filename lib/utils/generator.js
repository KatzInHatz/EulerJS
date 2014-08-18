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

// // split problems.txt and generate specified prompt
// var output = function(callback, comment, suffix, number) {
//   fs.readFile(__dirname + '/../data/problems.txt', 'utf8', function(err, data) {
//     if (err) throw err;

//     if (number) {
//       getPrompt(callback, comment, suffix, number, data);
//     } else {
//       find.highestAnd(function(number) {
//         // add leading zeros for file path
//         var padding = '000';
//         number = (padding + (+number + 1)).slice(-padding.length);
//         getPrompt(callback, comment, suffix, number, data);
//       });
//     }
//   });
// };

// // TODO: use buffers to read and write simultaneously
// var copy = function(path, resource) {
//   fs.readFile(path, function(err, data) {
//     if (err) throw err;

//     fs.writeFile(resource, data, function(err) {
//       if (err) throw err;

//       console.log('successfully generated ' + resource);
//     });
//   });
// };

// // write specified prompt to file in current directory
// var write = function(output, suffix, number) {
//   fs.readFile(__dirname + '/../data/resources.json', 'utf8', function(err, data) {
//     if (err) throw err;

//     var resources = JSON.parse(data)[+number]; // resources can be undefined, a string or an array of strings

//     fs.writeFile('euler_' + number + '.' + suffix, output, function(err) {
//       if (err) throw err;

//       console.log('successfully generated euler_' + number + '.' + suffix);
//     });

//     if (resources !== undefined) {
//       if (Array.isArray(resources)) {
//         for (var i = 0; i < resources.length; i++) {
//           copy(__dirname + '/../data/resources/' + resources[i], resources[i]);
//         }
//       } else {
//         copy(__dirname + '/../data/resources/' + resources, resources);
//       }
//     }
//   });
// };

var getData = function(path, failure, number) {
  var data;
  try {
    data = fs.readFileSync(path, 'utf8');
  } catch (error) {
    failure(path);
  }
  return data;
};

var generatePreview = function(number, success, failure) {
  var data, prompt;

  // number = number ? number : find.highestAnd();
  data = getData(__dirname + '/../data/problems.txt', failure, number);
  if (data) {
    prompt = getPrompt(data, number);
    success && success(prompt, number);
  }
};

var generateFile = function(sucess, failure, number) {
  var data, prompt;
  data = getData(__dirname + '/../data/problems.txt', failure, number);


};

// generate functions accept a three digit number as a string
// TODO: add a -c --coffee option
var generate = {};

generate.preview = generatePreview;

// generate.file = output.bind(null, write, true);

module.exports = generate;
