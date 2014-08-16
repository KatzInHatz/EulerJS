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

if ( program.cheat){if (typeof program.cheat === 'number') generate.cheat(program.cheat);
  else generate.cheat();
}
if ( program.generate){if (typeof program.generate === 'number') generate.file(program.generate);
  else generate.file();
}
if ( program.preview){if (typeof program.preview === 'number') generate.preview(program.preview);
  else generate.preview();
}
if ( program.verify){if (typeof program.verify === 'number') generate.verify(program.verify);
  else generate.verify();
}



// add leading zeros for file path
var padding = '000';
var number = (padding + 266).slice(-padding.length);
generate.file(number);
// generate.preview('100');
