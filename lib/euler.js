// var argv = require('minimist')(process.argv.slice(2));
// var ArgumentHandler = require('./utils/argumentsHandler');
var program = require('commander');
var colors = require('colors');
var generate = require('./utils/generator');
var validate = require('./utils/validator');
var find = require('./utils/finder');
var get = require('./utils/getter');
var inquirer = require('inquirer');
var helpers = require('./utils/helpers');

//add error handling when invalid number is submitted

// TODO: change -c to handle coffeescript. we can change cheat to
// solution. --skip can become --next and we'd be good.
program
  .version('0.0.1')
  .option('-s, --solve    [value]', 'Print solution', parseInt)
  .option('-g, --generate [value]', 'Generate file with problem prompt', parseInt)
  .option('-c, --coffee   [value]', 'Generate coffeescript file with problem prompt', parseInt)
  .option('-p, --preview  [value]', 'Preview problem prompt', parseInt)
  .option('-v, --verify   [value]', 'Verify solution to problem', parseInt)
  .option('-n, --next',             'Skip to the next problem')
  .parse(process.argv);


colors.setTheme({
  correct: 'green',
  incorrect: 'red'
});

var questions = {
  solve : {
    type: "confirm",
    name: "solveAnswer",
    message: "View answer to problem",
    default: false
    },
  double_solve : {
    type: "confirm",
    name: "solveAnswer",
    message: "Are you super sure?",
    default: false
    },

};


if ( program.solve || program.solve === 0){
  if (typeof program.solve === 'number') {
    //update question objects with correct number
    var num = helpers.numToStringWithPadding(program.solve);
    questions.solve.message = "View answer to problem " + num.toString();
    inquirer.prompt( [questions.solve, questions.double_solve], function(answer){
      validate.solution(num);
    } );
  }
  else {
    //get file name for largest file
      //if none then print error
    //else  output prompt
    find.highestAnd(function(num){
      console.log('the highest value is: ', num);
    });
    // var num = helpers.numToStringWithPadding(program.solve);
    // questions.solve.message = "View answer to problem " + num.toString();
    // inquirer.prompt( [questions.solve, questions.double_solve], function(answer){
    //   validate.solution(num);
    // } );
    // validate.solution();}
}

if ( program.generate || program.generate === 0){
  if ( program.coffee || program.coffee === 0){
    //generate coffee file
    if ( typeof program.coffee   === 'number') generate.file('coffee', program.coffee);
    else if ( typeof program.generate === 'number') generate.file('coffee', program.generate);
    else generate.file('coffee');

  } else {
    //generate js file
    typeof program.generate === 'number' ? generate.file('js', program.generate) : generate.file('js');
  }
}

if ( program.preview || program.preview === 0){
  if (typeof program.preview === 'number') {
    generate.preview(program.preview);
  }
  else generate.preview();
}

if ( program.verify || program.verify === 0){
  if (typeof program.verify === 'number') generate.verify(program.verify);
  else generate.verify();
}
