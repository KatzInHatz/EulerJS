// var argv = require('minimist')(process.argv.slice(2));
// var ArgumentHandler = require('./utils/argumentsHandler');
var generate = require('./utils/file_generator');
var program = require('commander');

program
  .version('0.0.1')
  .option('-c, --cheat [value]', 'Print answer', parseInt)
  .option('-g, --generate [value]', 'Generate file with problem prompt', parseInt)
  .option('-p, --preview [value]', 'Preview problem prompt', parseInt)
  .option('-v, --verify [value]', 'Verify solution to problem', parseInt)
  .parse(process.argv);

if ( program.cheat){console.log('cheat: ', program.cheat);}
if ( program.generate){console.log('generate: ', program.generate);}
if ( program.preview){console.log('preview: ', program.preview);}
if ( program.verify){console.log('verify: ', program.verify);}



// generate.file('100');
// generate.preview('100');
