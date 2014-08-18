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


var promptQuestions = {
  solve: {
    type: "confirm",
    name: "solveAnswer",
    message: "View answer to problem",
    default: false
    },
  solve_confirm: {
    type: "confirm",
    name: "solveAnswer",
    message: "Are you super sure?",
    default: false
    },
  generate: {
    type: "confirm",
    name: "generateProblem",
    message: "Generate file for problem 2?",
    default: false
    },
  generate_overwrite: {
    type: "confirm",
    name: "generateProblem",
    message: "Are you super sure?",
    default: false
    },
};


var solveHandler = function(problem){
  if (typeof problem === 'number') {
    //update question objects with correct number
    var num = helpers.numToStringWithPadding(program.solve);
    promptQuestions.solve.message = "View answer to problem " + num.toString();
    inquirer.prompt( [promptQuestions.solve, promptQuestions.solve_confirm], function(answer){
      validate.solution(num);
    } );
  }
  else {
    find.highestAnd(function(num){
      questions.solve.message = "View answer to problem " + num;
      inquirer.prompt( [promptQuestions.solve, promptQuestions.solve_confirm], function(answer){
        validate.solution(num);
      });
    });
  }
};


var generateJSHandler = function(problem){
  var num = helpers.numToStringWithPadding(problem);
  inquirer.prompt ( [promptQuestions.generate], function(answer){
    if (answer.generateProblem === true){
      //check if file already exists

      generate.file('js', num);
    }
  });
};


if ( program.solve    || program.solve === 0) solveHandler(program.solve);

if ( program.generate || program.generate === 0){
  if ( program.coffee || program.coffee === 0){
    if (typeof program.coffee === 'number')  generateCoffeeHandler(program.coffee);
    else generateCoffeeHandler(program.generate);
  } else {
    generateJSHandler(program.generate);
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

