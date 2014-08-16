var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var ArgumentHandler = require('./utils/argumentsHandler');

help = {
    'cheat': "View the answer to a problem.",
    'generate': "Generates Python file for a problem.",
    'skip': "Generates Python file for the next problem.",
    'preview': "Prints the text of a problem.",
    'verify': "Verifies the solution to a problem.",
};

var cheat = function(arg){console.log('cheat');};
var generage = function(arg){console.log('generate');};
var preview = function(arg){console.log('preview');};
var verify = function(arg){console.log('verify');};


var handler = new ArgumentHandler();
handler.addOption('cheat', 'c', true, 'cheat', help.cheat, [cheat]);
handler.invoke(argv);

var number = 10;
var prependComment = function(element, index, array) {
  array[index] = '//  ' + element;
};
fs.readFile(__dirname + '/problems.txt', 'utf8', function(err, data) {
  if (err) throw err;

  var problem = data.split('\n\n\n')[number];
  var comment = problem.split('\n').forEach(prependComment);
  console.log(comment);
  problem.join('\n');
  // TODO: check if file exists and prompt user to replace it
  fs.writeFile('euler_' + number + '.js', problem, function(err) {
   if (err) throw err;

   console.log('success');
  });
});

