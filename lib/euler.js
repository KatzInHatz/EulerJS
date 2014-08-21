var program = require('commander');
var helpers = require('./utils/helpers');
var handler = require('./utils/handler');

var description = 
"EuleyJS is a commandline tool for greasing up your rusty programming and math skills \
through Project Euler challenges. Use the euler command line interface to \
generate a prompt in JavaScript or CoffeeScript and \
verify your answers when you're done.";

description = "\n" + helpers.wordWrap(description, 80, '\n');

program
  .version('0.0.3', '--version')
  .option('-s, --solve    [value]', 'Print solution', parseInt)
  .option('-g, --generate [value]', 'Generate file with problem prompt', parseInt)
  .option('-c, --coffee   [value]', 'Generate coffeescript file with problem prompt', parseInt)
  .option('-p, --preview  [value]', 'Preview problem prompt', parseInt)
  .option('-v, --verify   [value]', 'Verify solution to problem', parseInt)
  .option('-V  --verify-all'      , 'Verify all solutions in cwd' )
  .parse(process.argv);

console.log(program.version);

var router = function(program){
  if ( program.solve    || program.solve === 0) handler.problemNumberHandler(handler.solveHandler, handler.noFilesFailure, program.solve );

  else if ( program.generate || program.generate === 0){
    if ( program.coffee || program.coffee === 0){
      if (typeof program.coffee === 'number')  handler.problemNumberHandler(handler.generateHandler, handler.noFilesFailure, program.coffee, 'coffee', true);
      else handler.problemNumberHandler(handler.generateHandler, handler.noFilesFailure, program.generate, 'coffee', true);
    } else {
      handler.problemNumberHandler(handler.generateHandler, handler.noFilesFailure, program.generate, 'js', true);
    }
  } 

  else if ( program.preview || program.preview === 0) handler.problemNumberHandler(handler.previewHandler, handler.noFilesFailure, program.preview);

  else if ( program.verify || program.verify === 0){ 
    if    ( program.coffee || program.coffee === 0){
      if (typeof program.verify === 'number') handler.problemNumberHandler(handler.verifyHandler, handler.noFilesFailure, program.verify, 'coffee');
      else handler.problemNumberHandler(handler.verifyHandler, handler.noFilesFailure, program.coffee, 'coffee');
    } else {
      handler.problemNumberHandler(handler.verifyHandler, handler.noFilesFailure, program.verify, 'js');
    }
  }

  else if ( program.verifyAll || program.verifyAll === 0){ 
    // console.log('program.version: ', program.version);
    if ( program.coffee || program.coffee === 0) {
      handler.problemNumberHandler(handler.verifyAllHandler, handler.noFilesFailure, program.verifyAll, 'coffee');
    }
    else handler.problemNumberHandler(handler.verifyAllHandler, handler.noFilesFailure, program.verifyAll, 'js');
  }

  else {
    console.log(description);
    program.outputHelp();
  }
};

router(program);
