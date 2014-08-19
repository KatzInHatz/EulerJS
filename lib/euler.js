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
  .option('--verify-all   [value]', 'Verify all solutions in cwd')
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
  generate_js: {
    type: "confirm",
    name: "generateProblem",
    message: "Generate js file for problem 2?",
    default: false
    },
  generate_js_overwrite: {
    type: "confirm",
    name: "generateProblem",
    message: "A js file for this problem already exists, are you sure you want to overwrite?",
    default: false
    },
  generate_coffee: {
    type: "confirm",
    name: "generateProblem",
    message: "Generate coffeescript file for problem ?",
    default: false
    },
  generate_coffee_overwrite: {
    type: "confirm",
    name: "generateProblem",
    message: "A coffeescript file for this problem already exists, are you sure you want to overwrite?",
    default: false
    },
};


var problemNumberHandler = function(success, failure, problem, suffix){
  if (typeof problem === 'number'){
    num = helpers.numToStringWithPadding(problem);
    success(num, suffix);
  } else {
    find.highest(function(num){
      console.log('num is: '.red, num);
      success(num, suffix);
    }, function(err){
      failure(err, suffix);
    });
  }
};

var noFilesFailure = function(err){
  console.log("There are no Euler files contained in this directory :(".red);
};

var solveHandler = function(problem){
  get.solution(function(sol){
    inquirer.prompt([promptQuestions.solve], function(answer){
      if (answer.solveAnswer === true){
        inquirer.prompt([promptQuestions.solve_confirm], function(answer){
          if (answer.solveAnswer === true ){
            console.log("The solution to problem " + problem, "is", sol.cyan);
          } else {
            console.log("A wise decision.".cyan);
          }
        });
      } else {
        console.log("A wise decision.".cyan);
      }
    });
  }, function(err){
    console.log("An answer to that problem doesn't exist :(".red);
  }, problem);
};

var generateHandler = function(problem, suffix){
  var question, confirmation;
  if (suffix === 'js'){
    promptQuestions.generate_js.message = "Generate js file for problem " + problem + "?";
    question = [promptQuestions.generate_js]; 
    confirmation = [promptQuestions.generate_js_overwrite];
  } else {
    promptQuestions.generate_coffee.message = "Generate coffeescript file for problem " + problem + "?";
    question = [promptQuestions.generate_coffee]; 
    confirmation = [promptQuestions.generate_coffee_overwrite];
  }

  find.ifExists(function(){
    inquirer.prompt(confirmation, function(answer){
      if (answer.generateProblem){
        generate.file(function(prompt){
          console.log("Successfully generated ", ("problem_"+ problem + "." + suffix).cyan);
        }, function(){
          console.log("Was unable to generate ", ("problem_"+ problem + "." + suffix).red);
        },
        suffix, problem);
      }
    });
  }, function(){
    inquirer.prompt(question, function(answer){
      if (answer.generateProblem){
        generate.file(function(prompt){
          console.log("Successfully generated ", ("problem_"+ problem + "." + suffix).cyan);
        }, function(){
          console.log("Was unable to generate ", ("problem_"+ problem + "." + suffix).red);
        },
        suffix, problem);
      }
    });
  }, suffix, problem);
};

var previewHandler = function(problem){
  generate.preview(function(prompt){
    console.log("The prompt is: ", prompt);
  }, function(err){
  }, problem);
};
//validate.one = function(success, failure, suffix, number)
//success(answer, solution, number);

var verifyHandler = function(problem, suffix){
  validate.one(function(answer, solution, num){
    if (answer === solution){console.log(answer.green, " is correct!");}
    else console.log(answer.red, " is incorrect :(");
  }, function(){
    console.log('inside error callback of verify');
  }, suffix, problem);
};

if ( program.solve    || program.solve === 0) problemNumberHandler(solveHandler, noFilesFailure, program.solve );

if ( program.generate || program.generate === 0){
  if ( program.coffee || program.coffee === 0){
    if (typeof program.coffee === 'number')  problemNumberHandler(generateHandler, noFilesFailure, program.coffee, 'coffee');
    else problemNumberHandler(generateHandler, noFilesFailure, program.generate, 'coffee');
  } else {
    problemNumberHandler(generateHandler, noFilesFailure, program.generate, 'js');
  }
} 

if ( program.preview || program.preview === 0) problemNumberHandler(previewHandler, noFilesFailure, program.generate);

if ( program.verify || program.verify === 0){ 
  if ( program.coffee || program.coffee === 0){
    if (typeof program.verify === 'number') problemNumberHandler(verifyHandler, noFilesFailure, program.verify, 'coffee');
    else problemNumberHandler(verifyHandler, noFilesFailure, program.coffee, 'coffee');
  } else {
    problemNumberHandler(verifyHandler, noFilesFailure, program.verify, 'js');
  }
}

