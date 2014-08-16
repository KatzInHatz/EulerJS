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

var number = '010';
var comment = false;

fs.readFile(__dirname + '/problems.txt', 'utf8', function(err, data) {
  if (err) throw err;
  var prompt = data.split('\n\n\n')[+number]; // remove leading zeros
  var output = comment ? '//\t' + prompt.split('\n').join('\n//\t') : prompt;

  fs.writeFile('euler_' + number + '.js', output, function(err) {
   if (err) throw err;

   console.log('success');
  });
});

